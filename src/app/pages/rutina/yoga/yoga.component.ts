import { Component, OnInit } from '@angular/core';
import { YogaService } from '../../../servicios/yoga.service';
import { Yoga } from '../../../interfaces/yoga';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { HeaderComponent } from '../../../components/header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-yoga',
  imports: [CommonModule, HeaderComponent, FormsModule], // Asegúrate de incluir CommonModule aquí
  standalone: true,
  templateUrl: './yoga.component.html',
  styleUrls: ['./yoga.component.scss'],
})
export class YogaComponent implements OnInit {
  yogaPoses: Yoga[] = [];
  displayedPoses: Yoga[] = [];
  completedPoses: boolean[] = []; // Para controlar las casillas de verificación
  private currentIndex: number = 0;
  public sessionNumber: number = 1; // Propiedad para el número de sesión

  constructor(private yogaService: YogaService) {}

  ngOnInit(): void {
    this.yogaService.getYogaPoses().subscribe({
      next: (data: Yoga[]) => {
        if (Array.isArray(data) && data.length > 0) {
          this.yogaPoses = data;
          this.loadPoses(); // Cargar las primeras 6 posturas
        } else {
          console.error('La API devolvió un formato inesperado:', data);
        }
      },
      error: (err) => console.error('Error al obtener las posturas de yoga:', err),
    });
  }

  loadPoses(): void {
    const nextSet = this.yogaPoses.slice(this.currentIndex, this.currentIndex + 6);

    // Reasignar respiraciones para todas las poses en cada sesión
    nextSet.forEach(pose => {
      pose.breaths = this.getRandomBreaths(); // Asignamos respiraciones aleatorias a todas las poses
    });

    this.displayedPoses = nextSet;
    this.completedPoses = new Array(nextSet.length).fill(false); // Reiniciar las casillas de verificación
    this.currentIndex += 6;
  }

  // Método para generar un número aleatorio de respiraciones (del 1 al 10)
  getRandomBreaths(): number {
    return Math.floor(Math.random() * 10) + 1;
  }

  completeSet(): void {
    if (this.completedPoses.every((completed) => completed)) {
      // Si todas las checkbox están marcadas
      if (this.currentIndex < this.yogaPoses.length) {
        this.loadPoses(); // Cargar el siguiente conjunto de poses
        this.sessionNumber++; // Incrementar el número de sesión
      } else {
        Swal.fire('¡Terminaste todas las posturas!');
      }
    } else {
      Swal.fire({
        title: '¿Te gustaría cambiar la sesión?',
        icon: 'question',
        iconHtml: '؟',
        confirmButtonText: 'Sí, cambiar',
        cancelButtonText: 'No, continuar con la actual',
        showCancelButton: true,
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          // Si el usuario selecciona "Sí, cambiar", reiniciamos las casillas de verificación
          this.completedPoses = new Array(this.displayedPoses.length).fill(false);
          // Cargar el siguiente conjunto de poses
          if (this.currentIndex < this.yogaPoses.length) {
            this.loadPoses();
            this.sessionNumber++; // Incrementar el número de sesión
          } else {
            Swal.fire('¡Terminaste todas las posturas!');
          }
        } else {
          // Si el usuario selecciona "No, continuar con la actual", no hacemos nada
          console.log('El usuario decidió continuar con la sesión actual.');
        }
      });
    }
  }
}

















