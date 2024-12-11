import { Component, OnInit, inject } from '@angular/core';
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
  yogaPoses: Yoga[] = []; // Lista completa de posturas de yoga
  displayedPoses: Yoga[] = []; // Posturas para mostrar en la sesión actual
  completedPoses: boolean[] = []; // Estado de completitud de las posturas actuales
  sessionNumber: number = 1; // Número de sesión actual
  progressPercentage: number = 0; // Porcentaje de progreso general

  // Inyección de servicios
  progressService = inject(ProgressService);
  yogaService = inject(YogaService);

  ngOnInit(): void {
    this.loadYogaPoses(); // Cargar las posturas de yoga al iniciar el componente
    this.listenToProgress(); // Escuchar cambios en el progreso desde ProgressService
  }

  /**
   * Carga las posturas de yoga desde el servicio.
   */
  async loadYogaPoses(): Promise<void> {
    try {
      Swal.fire({
        title: 'Cargando posturas de yoga...',
        allowOutsideClick: false,
        timerProgressBar: true,
        didOpen: () => Swal.showLoading(),
      });

      // Solicitar las posturas de yoga usando el servicio con Promise
      const poses = await this.yogaService.getYogaPoses();
      this.yogaPoses = poses.map((pose) => ({
        ...pose,
        breaths: this.getRandomBreaths(), // Agregar respiraciones aleatorias
      }));

      this.loadPoses(); // Cargar la primera sesión
      Swal.close();
    } catch (error) {
      Swal.fire('Error', 'No se pudieron cargar las posturas. Intenta más tarde.', 'error');
    }
  }

  /**
   * Escucha cambios en el progreso de yoga.
   */
  listenToProgress(): void {
    this.progressService.getYogaProgress().subscribe({
      next: (progress) => {
        this.progressPercentage = progress; // Actualizar el progreso
      },
    });
  }

  /**
   * Carga las posturas de yoga para la sesión actual.
   */
  loadPoses(): void {
    const startIndex = (this.sessionNumber - 1) * 6; // Índice inicial para la sesión
    const nextSet = this.yogaPoses.slice(startIndex, startIndex + 6); // Seleccionar 6 posturas
    this.displayedPoses = nextSet;
    this.completedPoses = new Array(nextSet.length).fill(false); // Inicializar los estados como "no completados"
    this.updateProgress(); // Actualizar el progreso
  }

  /**
   * Actualiza el progreso general de la sesión actual.
   */
  updateProgress(): void {
    const totalExercises = this.displayedPoses.length;
    const completedExercises = this.completedPoses.filter((checked) => checked).length;

    this.progressService.updateYogaProgress(completedExercises, totalExercises); // Notificar al servicio de progreso
  }

  /**
   * Maneja la finalización de un conjunto de posturas.
   */
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

  /**
   * Genera un número aleatorio de respiraciones entre 1 y 10.
   */
  getRandomBreaths(): number {
    return Math.floor(Math.random() * 10) + 1;
  }
}
















