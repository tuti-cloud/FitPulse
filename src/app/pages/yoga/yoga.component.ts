import { Component, inject, OnInit } from '@angular/core';
import { YogaService } from '../../servicios/yoga.service';
import { Yoga } from '../../interfaces/yoga';
import { ProgressService } from '../../servicios/progress.service';
import Swal from 'sweetalert2'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-yoga',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent],
  templateUrl: './yoga.component.html',
  styleUrls: ['./yoga.component.scss'],
})
export class YogaComponent implements OnInit {
  yogaPoses: Yoga[] = [];
  displayedPoses: Yoga[] = [];
  completedPoses: boolean[] = [];
  sessionNumber: number = 1;
  progressPercentage: number = 0;

  progressService = inject(ProgressService);
  yogaService = inject(YogaService);

  ngOnInit(): void {
    this.loadYogaPoses();

    this.progressService.getYogaProgress().subscribe({
      next: (progress) => {
        this.progressPercentage = progress; // Escuchar cambios en el progreso de Yoga
      },
    });
  }

  loadYogaPoses(): void {
    Swal.fire({
      title: 'Cargando posturas de yoga...',
      allowOutsideClick: false,
      timerProgressBar: true,
      didOpen: () => Swal.showLoading(),
    });

    this.yogaService.getYogaPoses().subscribe({
      next: (poses: Yoga[]) => {
        this.yogaPoses = poses;
        this.loadPoses(); 
        Swal.close();
      },
      error: (error) => {
        Swal.fire('Error', 'No se pudieron cargar las posturas. Intenta más tarde.', 'error');
      },
    });
  }

  loadPoses(): void {
    const startIndex = (this.sessionNumber - 1) * 6; // Calcular el índice inicial para la sesión actual
    const nextSet = this.yogaPoses.slice(startIndex, startIndex + 6); // Tomar 6 posturas para la sesión
    this.displayedPoses = nextSet;
    this.completedPoses = new Array(nextSet.length).fill(false);  
    this.updateProgress();
  }

  updateProgress(): void {
    const totalExercises = this.displayedPoses.length;
    const completedExercises = this.completedPoses.filter((checked) => checked).length;

    console.log("Progreso actualizado:", { completed: completedExercises, total: totalExercises });

    this.progressService.updateYogaProgress(completedExercises, totalExercises);
  }

  completeSet(): void {
    if (this.completedPoses.every((completed) => completed)) {
      Swal.fire('¡Felicidades!', 'Terminaste todas las posturas de esta sesión.', 'success');
    } else {
      // Si no todas las casillas están marcadas, preguntar al usuario
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'No todas las posturas están completas. ¿Quieres cambiar la sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cambiar sesión',
        cancelButtonText: 'No, seguir en esta sesión',
      }).then((result) => {
        if (result.isConfirmed) {
          this.sessionNumber++; // Incrementar el número de sesión
          this.loadPoses(); // Cargar las posturas de la nueva sesión
          Swal.fire('¡Sesión cambiada!', 'Has cambiado a la siguiente sesión.', 'success');
        } else {
          // Si el usuario cancela, no hacer nada
          Swal.fire('¡Seguimos en la misma sesión!', 'Puedes seguir completando las posturas.', 'info');
        }
      });
    }
  }
}















