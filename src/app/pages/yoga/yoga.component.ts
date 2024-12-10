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
        this.progressPercentage = progress; 
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
        this.yogaPoses = poses.map((pose) => ({
          ...pose,
          breaths: this.getRandomBreaths(),
        }));
        this.loadPoses();
        Swal.close();
      },
      error: (error) => {
        Swal.fire('Error', 'No se pudieron cargar las posturas. Intenta más tarde.', 'error');
      },
    });
  }

  loadPoses(): void {
    const startIndex = (this.sessionNumber - 1) * 6;
    const nextSet = this.yogaPoses.slice(startIndex, startIndex + 6); 
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
      Swal.fire('¡Felicidades!', 'Terminaste todas las posturas de esta sesión.', 'success').then(() => {
        this.sessionNumber++; 
        this.loadPoses(); 
      });
    } else {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'No todas las posturas están completas. ¿Quieres cambiar la sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cambiar sesión',
        cancelButtonText: 'No, seguir en esta sesión',
      }).then((result) => {
        if (result.isConfirmed) {
          this.sessionNumber++; 
          this.loadPoses(); 
          Swal.fire('¡Sesión cambiada!', 'Has cambiado a la siguiente sesión.', 'success');
        } else {
     
          Swal.fire('¡Seguimos en la misma sesión!', 'Seguí completando las posturas.', 'info');
        }
      });
    }
  }

  getRandomBreaths(): number {
    return Math.floor(Math.random() * 10) + 1; 
  }
}
















