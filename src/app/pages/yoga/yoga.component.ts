import { Component, OnInit } from '@angular/core';
import { YogaService } from '../../servicios/yoga.service';
import { Yoga } from '../../interfaces/yoga';
import Swal from 'sweetalert2'; // Asegúrate de tenerlo instalado e importado
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-yoga',
  imports: [CommonModule, HeaderComponent, FormsModule],
  standalone: true,
  templateUrl: './yoga.component.html',
  styleUrls: ['./yoga.component.scss'],
})
export class YogaComponent implements OnInit {
  yogaPoses: Yoga[] = []; // Todas las posturas cargadas desde la API
  displayedPoses: Yoga[] = []; // Posturas que se mostrarán en la sesión actual
  completedPoses: boolean[] = []; // Seguimiento de posturas completadas
  currentIndex: number = 0; // Índice actual para paginación
  sessionNumber: number = 1; // Número de sesión actual

  constructor(private yogaService: YogaService) {}

  ngOnInit(): void {
    this.loadYogaPoses(); // Cargar las posturas al inicializar el componente
  }

  /**
   * Carga las posturas de yoga desde el servicio y las inicializa.
   */
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
        this.loadPoses(); // Cargar las primeras posturas
        Swal.close();
      },
      error: (error) => {
        console.error('Error al cargar las posturas:', error);
        Swal.fire('Error', 'No se pudieron cargar las posturas. Intenta más tarde.', 'error');
      },
    });
  }

  /**
   * Carga el siguiente conjunto de posturas para la sesión actual.
   */
  loadPoses(): void {
    const nextSet = this.yogaPoses.slice(this.currentIndex, this.currentIndex + 6);

    nextSet.forEach((pose) => (pose.breaths = this.getRandomBreaths()));

    this.displayedPoses = nextSet;
    this.completedPoses = new Array(nextSet.length).fill(false);
    this.currentIndex += 6;
  }

  /**
   * Genera un número aleatorio de respiraciones para una postura.
   */
  getRandomBreaths(): number {
    return Math.floor(Math.random() * 10) + 1;
  }

  /**
   * Maneja la finalización de un conjunto de posturas con una confirmación de SweetAlert2.
   */
  completeSet(): void {
    if (this.completedPoses.every((completed) => completed)) {
      // Si todas las posturas están completadas, procede normalmente
      if (this.currentIndex < this.yogaPoses.length) {
        this.loadPoses();
        this.sessionNumber++;
      } else {
        Swal.fire('¡Felicidades!', 'Terminaste todas las posturas.', 'success');
      }
    } else {
      // Si no todas las posturas están completadas, muestra un modal de confirmación
      Swal.fire({
        title: 'Algunas posturas no están completadas',
        text: '¿Estás seguro de que quieres cambiar de sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cambiar!',
        cancelButtonText: 'No, no lo cambies',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          // Si el usuario elige "Sí", marca todas las posturas como completadas y pasa a la siguiente sesión
          this.completedPoses.fill(true);
          if (this.currentIndex < this.yogaPoses.length) {
            this.loadPoses();
            this.sessionNumber++;
          } else {
            Swal.fire('¡Felicidades!', 'Terminaste todas las posturas.', 'success');
          }
        } else {
          // Si el usuario elige "No", no se hace nada
          Swal.fire('Operación cancelada', 'No se ha cambiado de sesión.', 'info');
        }
      });
    }
  }
}





