import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private exercisesProgress = new BehaviorSubject<number>(0);
  private yogaProgress = new BehaviorSubject<number>(0);

  getExercisesProgress() {
    return this.exercisesProgress.asObservable();
  }

  getYogaProgress() {
    return this.yogaProgress.asObservable();
  }

  updateExercisesProgress(progress: number, totalExercises: number) {
    this.exercisesProgress.next((progress / totalExercises) * 100);
  }

  updateYogaProgress(progress: number) {
    this.yogaProgress.next(progress);
  }
}
