import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ExerciseService } from '../servicios/exercise.service';
import { Exercise } from '../interfaces/exercise';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';
import Swal from 'sweetalert2';
import { ProgressService } from '../servicios/progress.service';

@Component({
  selector: 'app-seleccion-de-ejercicios',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FormsModule],
  templateUrl: './seleccion-de-ejercicios.component.html',
  styleUrls: ['./seleccion-de-ejercicios.component.scss'],
})
export class SeleccionDeEjerciciosComponent implements OnInit {
  selectedOptions: string[] = [];
  exercises: { [key: string]: Exercise[] } = {};
  maxExercises: number = 3;
  isLoading: boolean = true;
  progressPercentage: number = 0;

  route = inject(ActivatedRoute);
  exerciseService = inject(ExerciseService);
  progressService = inject(ProgressService);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selectedOptions = params['selectedOptions'] ? params['selectedOptions'].split(',') : [];
      this.showLoadingModal();
      this.loadExercises();
    });

    this.progressService.getExercisesProgress().subscribe({
      next: (progress) => {
        this.progressPercentage = progress;
      },
    });
  }

  showLoadingModal(): void {
    Swal.fire({
      title: 'Cargando ejercicios...',
      html: 'Por favor, espera un momento.',
      allowOutsideClick: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  loadExercises(): void {
    let completedRequests = 0;
    const totalRequests = this.selectedOptions.length;

    this.selectedOptions.forEach((option) => {
      let targets: string[] = [];

      switch (option) {
        case 'Piernas y Glúteos':
          targets = ['quads', 'glutes'];
          break;
        case 'Abdomen':
          targets = ['abs'];
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

      targets.forEach((target) => {
        this.exerciseService.getExercisesByBodyPart(target).subscribe({
          next: (data) => {
            if (!this.exercises[option]) {
              this.exercises[option] = [];
            }

            const exercisesWithRandom = data.slice(0, this.maxExercises).map((exercise) => ({
              ...exercise,
              series: this.getRandomNumber(3, 6),
              reps: this.getRandomNumber(8, 15),
              completed: false,
            }));

            this.exercises[option] = this.exercises[option].concat(exercisesWithRandom);
            this.updateProgress();
          },
          error: (error) => {
            console.error(`Error al cargar ejercicios para ${option}:`, error);
          },
          complete: () => {
            completedRequests++;
            if (completedRequests === totalRequests) {
              this.isLoading = false;
              Swal.close();
            }
          },
        });
      });
    });
  }

  updateProgress(): void {
    let totalExercises = 0;
    let completedExercises = 0;

    for (const key in this.exercises) {
      if (this.exercises.hasOwnProperty(key)) {
        this.exercises[key].forEach((exercise) => {
          totalExercises++;
          if (exercise.completed) {
            completedExercises++;
          }
        });
      }
    }

    this.progressService.updateExercisesProgress(completedExercises, totalExercises);
  }

  toggleCompletion(exercise: Exercise): void {
    exercise.completed = !exercise.completed;
    this.updateProgress();
  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
