import { Component, OnInit } from '@angular/core';
import { ProgressService } from '../../servicios/progress.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

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

  constructor(
    private progressService: ProgressService,
    private route: ActivatedRoute
  ) {}

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

  showResultsModal(): void {
    // Detectar si estamos en la ruta de Yoga o Ejercicios basándonos en la clase activa
    const activeLink = document.querySelector('.links.active') as HTMLElement;
    let progress: number = 0;
    let progressType: string = '';

    // Si el enlace activo es de Yoga, mostramos el progreso de Yoga
    if (activeLink?.innerText.includes('Yogaterapia')) {
      progress = this.yogaProgressPercentage;
      progressType = 'Yoga';
    } 
    // Si el enlace activo es de Ejercicios, mostramos el progreso de Ejercicios
    else if (activeLink?.innerText.includes('Ejercicios')) {
      progress = this.exercisesProgressPercentage;
      progressType = 'Ejercicios';
    }

    // Mostrar el modal con el progreso
    const progressMessage = progress === 100
      ? `¡Felicidades! Has alcanzado el 100% de tu progreso en ${progressType}.`
      : `Progreso en ${progressType}: ${progress.toFixed(2)}%`;

    Swal.fire({
      title: `Resultados de ${progressType}`,
      text: progressMessage,
      icon: progress === 100 ? 'success' : 'info',
      confirmButtonText: 'Cerrar',
    });
  }
}
