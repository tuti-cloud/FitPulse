import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { ExerciseService } from '../servicios/exercise.service';  // Asegúrate de importar el servicio correctamente
import { Exercise } from '../interfaces/exercise'; // Asegúrate de importar la interfaz correctamente

@Component({
  selector: 'app-seleccion-de-ejercicios',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './seleccion-de-ejercicios.component.html',
  styleUrls: ['./seleccion-de-ejercicios.component.scss']
})
export class SeleccionDeEjerciciosComponent implements OnInit {

  selectedOptions: string[] = [];
  exercises: { [key: string]: Exercise[] } = {};
  maxExercises: number= 3

   route = inject(ActivatedRoute);
   exerciseService = inject(ExerciseService);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedOptions = params['selectedOptions'] ? params['selectedOptions'].split(',') : [];
      this.loadExercises();
    });
  }

  loadExercises(): void {
    this.selectedOptions.forEach(option => {
      let targets: string[] = [];
      
      switch (option) {
        case 'Piernas y Glúteos':
          targets = ['quads', 'glutes'];
          break;
        case 'Abdomen':
          targets = ['abs']; // Asegúrate de que este es el valor correcto
          break;
        case 'Espalda y Bíceps':
          targets = ['upper back', 'biceps'];
          break;
        case 'Pecho y Hombro y Triceps':
          targets = ['pectorals', 'delts', 'triceps'];
          break;
        default:
          console.error(`Opción desconocida: ${option}`);
      }
  
      targets.forEach(target => {
        this.exerciseService.getExercisesByBodyPart(target).subscribe(data => {
          console.log(`Ejercicios obtenidos para ${option} (${target}):`, data);
          if (!this.exercises[option]) {
            this.exercises[option] = [];
          }
          this.exercises[option] = this.exercises[option].concat(data.slice(0, this.maxExercises));
        }, error => {
          console.error(`Error al cargar ejercicios para ${option}:`, error);
        });
      });
    });
  }
  
  
}


  
  
  
  

