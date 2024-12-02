import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  private yogaProgressSubject = new BehaviorSubject<number>(0);
  private exercisesProgressSubject = new BehaviorSubject<number>(0);

  constructor() {}

  // Métodos para obtener el progreso como Observables
  getYogaProgress() {
    return this.yogaProgressSubject.asObservable();
  }

  getExercisesProgress() {
    return this.exercisesProgressSubject.asObservable();
  }

  // Métodos para actualizar el progreso de Yoga
  updateYogaProgress(completed: number, total: number): void {
    const progress = this.calculateProgress(completed, total);
    console.log('Actualizando progreso de yoga:', { completed, total, progress }); // Log para depurar
    this.yogaProgressSubject.next(progress);
  }

  // Métodos para actualizar el progreso de Ejercicios
  updateExercisesProgress(completed: number, total: number): void {
    const progress = this.calculateProgress(completed, total);
    this.exercisesProgressSubject.next(progress);
  }

  private calculateProgress(completed: number, total: number): number {
    return total > 0 ? (completed / total) * 100 : 0;
  }

  resetYogaProgress(): void {
    this.yogaProgressSubject.next(0);
  }

  resetExercisesProgress(): void {
    this.exercisesProgressSubject.next(0);
  }
}






