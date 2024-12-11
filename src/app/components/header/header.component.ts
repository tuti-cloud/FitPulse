import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from '../../servicios/progress.service';
import { DatosService } from '../../servicios/datos.service'; // Importamos el servicio de datos
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
  exercisesProgressPercentage: number = 0; // Progreso para los ejercicios
  yogaProgressPercentage: number = 0; // Progreso para el yoga

  constructor(
    private progressService: ProgressService,
    private datosService: DatosService, // Inyectamos el servicio de autenticación
    private router: Router
  ) {}

  ngOnInit(): void {
    // Suscribirse al progreso de los ejercicios
    this.progressService.getExercisesProgress().subscribe(progress => {
      this.exercisesProgressPercentage = progress; // Actualiza el progreso de ejercicios
    });

    // Suscribirse al progreso de yoga
    this.progressService.getYogaProgress().subscribe(progress => {
      this.yogaProgressPercentage = progress; // Actualiza el progreso de yoga
    });
  }

  // Mostrar resultados del progreso dependiendo del componente actual
  showResultsModal(): void {
    const currentRoute = this.router.url;

    let progress: number = 0; // Inicializamos 'progress' para evitar el error

    if (currentRoute.includes('ejercicios')) {
      progress = this.exercisesProgressPercentage;
    } else if (currentRoute.includes('yoga')) {
      progress = this.yogaProgressPercentage;
    }

    const progressMessage =
      progress === 100
        ? '¡Felicidades! Has alcanzado el 100% de tu progreso.'
        : `Progreso: ${progress.toFixed(2)}%`;

    Swal.fire({
      title: 'Resultados',
      text: progressMessage,
      icon: progress === 100 ? 'success' : 'info',
      confirmButtonText: 'Cerrar',
    });
  }

  // Método para cerrar sesión
  logout(): void {
    this.datosService.logout(); // Elimina el usuario del almacenamiento local
    this.router.navigate(['/pagina-inicio']); // Redirige a la página de inicio de sesión

    // Mensaje de confirmación
    Swal.fire({
      title: 'Sesión Cerrada',
      text: 'Has cerrado sesión exitosamente.',
      icon: 'info',
      confirmButtonText: 'Ok',
    });
  }
}
