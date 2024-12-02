import { Component, OnInit } from '@angular/core';
import { ProgressService } from '../../servicios/progress.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  exercisesProgressPercentage: number = 0;  // Progreso para los ejercicios
  yogaProgressPercentage: number = 0;  // Progreso para el yoga

  constructor(private progressService: ProgressService) {}

  ngOnInit(): void {
    // Suscribirse al progreso de los ejercicios
    this.progressService.getExercisesProgress().subscribe(progress => {
      this.exercisesProgressPercentage = progress;  // Actualiza el progreso de ejercicios
    });

    // Suscribirse al progreso de yoga
    this.progressService.getYogaProgress().subscribe(progress => {
      this.yogaProgressPercentage = progress;  // Actualiza el progreso de yoga
    });
  }

  // Mostrar resultados del progreso, tanto de ejercicios como de yoga
  showResultsModal(type: string): void {
    let progress: number = 0;  // Inicializamos 'progress' para evitar el error

    // Verifica si es el progreso de ejercicios o yoga
    if (type === 'ejercicios') {
      progress = this.exercisesProgressPercentage;
    } else if (type === 'yoga') {
      progress = this.yogaProgressPercentage;
    }

    // Construir el mensaje basado en el progreso
    const progressMessage = progress === 100
      ? '¡Felicidades! Has alcanzado el 100% de tu progreso.'
      : `Progreso: ${progress.toFixed(2)}%`;

    Swal.fire({
      title: 'Resultados',
      text: progressMessage,
      icon: progress === 100 ? 'success' : 'info',
      confirmButtonText: 'Cerrar',
    });
  }
}
