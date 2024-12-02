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
  yogaPoses: Yoga[] = [];               // Todas las posturas disponibles
  displayedPoses: Yoga[] = [];          // Posturas actuales en la pantalla
  completedPoses: boolean[] = [];       // Estado de las checkboxes
  sessionNumber: number = 1;
  progressPercentage: number = 0;

  // Inyección de servicios
  progressService = inject(ProgressService);
  yogaService = inject(YogaService);

  ngOnInit(): void {
    this.loadYogaPoses(); 
  }

  // Método para cargar las posturas de yoga desde el servicio
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
        this.loadPoses();  // Cargar las posturas iniciales en la vista
        Swal.close();
      },
      error: (error) => {
        console.error('Error al cargar las posturas:', error);
        Swal.fire('Error', 'No se pudieron cargar las posturas. Intenta más tarde.', 'error');
      },
    });
  }

  // Carga las primeras 6 posturas en la pantalla
  loadPoses(): void {
    this.displayedPoses = this.yogaPoses.slice(0, 6);  // Mostrar solo 6 posturas
    this.completedPoses = new Array(this.displayedPoses.length).fill(false);  // Inicializar las checkboxes
    this.updateProgress(); // Actualiza el progreso al cargar
  }

  // Actualiza el progreso basado en las checkboxes marcadas
  updateProgress(): void {
    const completedExercises = this.completedPoses.filter((completed) => completed).length;
    const totalExercises = this.completedPoses.length;
    

    // Evitar errores si no hay ejercicios cargados
    if (totalExercises === 0) {
      this.progressPercentage = 0;
    } else {
      this.progressPercentage = (completedExercises / totalExercises) * 100;
    }

    // Actualizar el progreso en el servicio
    this.progressService.updateYogaProgress(completedExercises,totalExercises);


    // Logs para depuración
    console.log('Progreso Actualizado:', this.progressPercentage);
    console.log('Estado de completedPoses:', this.completedPoses);
  }

  // Maneja el cambio de estado en cada checkbox
  onCheckboxChange(index: number): void {
    this.completedPoses[index] = !this.completedPoses[index];  // Alternar el estado
    this.updateProgress();  // Recalcular el progreso
  }

  // Método para pasar al siguiente conjunto de posturas
  completeSet(): void {
    if (this.completedPoses.every((completed) => completed)) {
      Swal.fire('¡Felicidades!', 'Terminaste todas las posturas de esta sesión.', 'success');
    } else {
      Swal.fire('¡Advertencia!', 'No todas las posturas están completadas.', 'info');
    }
  }
}

