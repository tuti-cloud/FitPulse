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
  yogaPoses: Yoga[] = [];
  displayedPoses: Yoga[] = [];
  completedPoses: boolean[] = [];
  private currentIndex: number = 0;
  public sessionNumber: number = 1;

  constructor(private yogaService: YogaService) {}

  ngOnInit(): void {
    // Mostrar el modal de carga
    let timerInterval: any;
    Swal.fire({
      title: 'Cargando posturas de yoga...',
      html: 'Por favor, espera un momento.',
      allowOutsideClick: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Iniciar la carga de las poses
    this.yogaService.getYogaPoses().subscribe({
      next: (data: Yoga[]) => {
        if (Array.isArray(data) && data.length > 0) {
          this.yogaPoses = data;
          this.loadPoses(); // Cargar las primeras poses
        } else {
          console.error('La API devolvió un formato inesperado:', data);
        }
      },
      error: (err) => {
        console.error('Error al obtener las posturas de yoga:', err);
        Swal.fire('Error', 'No se pudieron cargar las poses de yoga. Inténtalo más tarde.', 'error');
      },
      complete: () => {
        // Cerrar el modal una vez que se haya completado la carga
        Swal.close();
      },
    });
  }

  loadPoses(): void {
    const nextSet = this.yogaPoses.slice(this.currentIndex, this.currentIndex + 6);

    nextSet.forEach((pose) => {
      pose.breaths = this.getRandomBreaths();
    });

    this.displayedPoses = nextSet;
    this.completedPoses = new Array(nextSet.length).fill(false);
    this.currentIndex += 6;
  }

  getRandomBreaths(): number {
    return Math.floor(Math.random() * 10) + 1;
  }

  completeSet(): void {
    if (this.completedPoses.every((completed) => completed)) {
      if (this.currentIndex < this.yogaPoses.length) {
        this.loadPoses();
        this.sessionNumber++;
      } else {
        Swal.fire('¡Terminaste todas las posturas!');
      }
    } else {
      Swal.fire({
        title: '¿Te gustaría cambiar la sesión?',
        icon: 'question',
        confirmButtonText: 'Sí, cambiar',
        cancelButtonText: 'No, continuar con la actual',
        showCancelButton: true,
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.completedPoses = new Array(this.displayedPoses.length).fill(false);
          if (this.currentIndex < this.yogaPoses.length) {
            this.loadPoses();
            this.sessionNumber++;
          } else {
            Swal.fire('¡Terminaste todas las posturas!');
          }
        }
      });
    }
  }
}


















