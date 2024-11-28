import { Component, OnInit } from '@angular/core';
import { YogaService } from '../../../servicios/yoga.service';
import { Yoga } from '../../../interfaces/yoga';
import { HeaderComponent } from '../../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import Swal from 'sweetalert2';

@Component({
  selector: 'app-yoga',
  imports: [CommonModule, HeaderComponent, FormsModule], // Agregar FormsModule aquí
  standalone: true,
  templateUrl: './yoga.component.html',
  styleUrls: ['./yoga.component.scss'],
})
export class YogaComponent implements OnInit {
  yogaPoses: Yoga[] = []; // Todas las poses
  displayedPoses: Yoga[] = []; // Poses mostradas en pantalla
  completedPoses: boolean[] = []; // Estados de las checkbox para las poses actuales
  private currentIndex: number = 0; // Índice para rastrear qué conjunto de poses mostrar

  constructor(private yogaService: YogaService) {}

  ngOnInit(): void {
    this.yogaService.getYogaPoses().subscribe({
      next: (data: Yoga[]) => {
        if (Array.isArray(data) && data.length > 0) {
          this.yogaPoses = data;
          this.loadPoses(); // Cargar las primeras 6 poses
        } else {
          console.error('La API devolvió un formato inesperado:', data);
        }
      },
      error: (err) => console.error('Error al obtener las poses de yoga:', err),
    });
  }

  loadPoses(): void {
    const nextSet = this.yogaPoses.slice(this.currentIndex, this.currentIndex + 6); // Obtener el siguiente conjunto de 6 poses
    this.displayedPoses = nextSet;
    this.completedPoses = new Array(nextSet.length).fill(false); // Reiniciar los estados de las checkbox
    this.currentIndex += 6;
  }

  completeSet(): void {
    if (this.completedPoses.every((completed) => completed)) {
      // Si todas las checkbox están marcadas
      if (this.currentIndex < this.yogaPoses.length) {
        this.loadPoses(); // Cargar el siguiente conjunto de poses
      } else {
        Swal.fire("Terminaste todas las posturas!");
      }
    } else {
      Swal.fire({
        title: "Te gustaría cambiar la sesión?",
        icon: "question",
        iconHtml: "؟",
        confirmButtonText: "Sí, cambiar",
        cancelButtonText: "No, continuar con la actual",
        showCancelButton: true,
        showCloseButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          // Si el usuario selecciona "Sí, cambiar", reiniciamos las casillas de verificación
          this.completedPoses = new Array(this.displayedPoses.length).fill(false); 
          // Cargar el siguiente conjunto de poses
          if (this.currentIndex < this.yogaPoses.length) {
            this.loadPoses();
          } else {
            Swal.fire("Terminaste todas las posturas!");
          }
        } else {
          // Si el usuario selecciona "No, continuar con la actual", no hacemos nada
          console.log("El usuario decidió continuar con la sesión actual.");
        }
      });
    }
  }
}






