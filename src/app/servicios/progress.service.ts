import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private yogaProgressSubject = new BehaviorSubject<number>(0);
  private exercisesProgressSubject = new BehaviorSubject<number>(0);

  // Obtener el progreso de yoga
  getYogaProgress(): Observable<number> {
    return this.yogaProgressSubject.asObservable();
  }

  // Actualizar el progreso de yoga
  updateYogaProgress(completed: number, total: number): void {
    const progress = (completed / total) * 100;
    this.yogaProgressSubject.next(progress);
  }

  // Obtener el progreso de ejercicios
  getExercisesProgress(): Observable<number> {
    return this.exercisesProgressSubject.asObservable();
  }

  // Actualizar el progreso de ejercicios
  updateExercisesProgress(completed: number, total: number): void {
    const progress = (completed / total) * 100;
    this.exercisesProgressSubject.next(progress);
  }
}
