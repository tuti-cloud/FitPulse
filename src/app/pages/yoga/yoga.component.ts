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
  completedPoses: boolean[] = [];  // Lista para mantener el estado de las checkboxes
  sessionNumber: number = 1;
  progressPercentage: number = 0; // Progreso de la sesión

  progressService = inject(ProgressService);
  yogaService = inject(YogaService);

  ngOnInit(): void {
    this.loadYogaPoses(); 
  }

  // Método para cargar las posturas de yoga
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
        this.loadPoses(); // Cargar las posturas en la vista
        Swal.close();
      },
      error: (error) => {
        console.error('Error al cargar las posturas:', error);
        Swal.fire('Error', 'No se pudieron cargar las posturas. Intenta más tarde.', 'error');
      },
    });
  }

  // Método para cargar un conjunto de posturas de yoga
  loadPoses(): void {
    const nextSet = this.yogaPoses.slice(0, 6);  // Solo cargar 6 posturas
    this.displayedPoses = nextSet;
    this.completedPoses = new Array(nextSet.length).fill(false);  // Inicializamos los valores en 'false'
    this.updateProgress(); // Actualizamos el progreso
  }

  // Método para actualizar el progreso basado en las checkboxes
  updateProgress(): void {
    const totalExercises = this.displayedPoses.length;  // Total de posturas mostradas
    const completedExercises = this.completedPoses.filter(checked => checked).length;  // Cuántas posturas están completadas

    // Calcular el porcentaje de progreso
    this.progressPercentage = (totalExercises > 0) ? (completedExercises / totalExercises) * 100 : 0;

    // Actualizar el progreso en el servicio
    this.progressService.updateExercisesProgress(completedExercises, totalExercises);
  }

  // Método que se ejecuta cuando se marca o desmarca una checkbox
  toggleCompletion(index: number): void {
    this.completedPoses[index] = !this.completedPoses[index];  // Actualizamos el estado de la checkbox
    this.updateProgress();  // Actualizamos el progreso
  }

  // Método para avanzar al siguiente conjunto de posturas
  completeSet(): void {
    if (this.completedPoses.every((completed) => completed)) {
      Swal.fire('¡Felicidades!', 'Terminaste todas las posturas de esta sesión.', 'success');
    } else {
      Swal.fire('¡Advertencia!', 'No todas las posturas están completadas.', 'info');
    }
  }
}
