import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  private yogaProgressSubject = new BehaviorSubject<number>(0);
  private exercisesProgressSubject = new BehaviorSubject<number>(0);



  getYogaProgress(): Observable<number> {
    return this.yogaProgressSubject.asObservable();
  }

  updateYogaProgress(completed: number, total: number): void {
    const progress = this.calculateProgress(completed, total);
    console.log('Actualizando progreso de yoga:', { completed, total, progress }); // Log para depurar
    this.yogaProgressSubject.next(progress);
  }

  getExercisesProgress(): Observable<number> {
    return this.exercisesProgressSubject.asObservable();
  }

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






