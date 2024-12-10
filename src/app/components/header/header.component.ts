import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  exercisesProgressPercentage: number = 0;  
  yogaProgressPercentage: number = 0; 

  constructor(private progressService: ProgressService, private router: Router) {}

  ngOnInit(): void {
    this.progressService.getExercisesProgress().subscribe(progress => {
      this.exercisesProgressPercentage = progress;  
    });

    this.progressService.getYogaProgress().subscribe(progress => {
      this.yogaProgressPercentage = progress;  
    });
  }

  showResultsModal(): void {
    const currentRoute = this.router.url;

    let progress: number = 0;  

    if (currentRoute.includes('ejercicios')) {
      progress = this.exercisesProgressPercentage;
    } else if (currentRoute.includes('yoga')) {
      progress = this.yogaProgressPercentage;
    }

    console.log('Progreso a mostrar en el modal:', progress); 

  
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
