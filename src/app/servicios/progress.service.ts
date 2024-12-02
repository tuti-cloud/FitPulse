import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  private yogaProgressSubject = new BehaviorSubject<number>(0);
  private exercisesProgressSubject = new BehaviorSubject<number>(0);

  constructor() {}

  // Obtener el progreso de yoga
  getYogaProgress(): Observable<number> {
    return this.yogaProgressSubject.asObservable();
  }

  // Actualizar el progreso de yoga
  updateYogaProgress(completed: number, total: number): void {
    const progress = this.calculateProgress(completed, total);
    console.log('Actualizando progreso de yoga:', { completed, total, progress }); // Log para depurar
    this.yogaProgressSubject.next(progress);
  }

  // Obtener el progreso de ejercicios
  getExercisesProgress(): Observable<number> {
    return this.exercisesProgressSubject.asObservable();
  }

  // Actualizar el progreso de ejercicios
  updateExercisesProgress(completed: number, total: number): void {
    const progress = this.calculateProgress(completed, total);
    this.exercisesProgressSubject.next(progress);
  }

  // Método para calcular el progreso
  private calculateProgress(completed: number, total: number): number {
    return total > 0 ? (completed / total) * 100 : 0;
  }

  // Resetear progreso de yoga
  resetYogaProgress(): void {
    this.yogaProgressSubject.next(0);
  }

  // Resetear progreso de ejercicios
  resetExercisesProgress(): void {
    this.exercisesProgressSubject.next(0);
  }
}






