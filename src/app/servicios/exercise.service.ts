import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private apiUrl = 'https://exercisedb.p.rapidapi.com/exercises/name/';
  private headers = new HttpHeaders({
    'X-RapidAPI-Key': '194644aa73mshf2beeb524f60d38p176e48jsn5c1ba658a958',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  });

  constructor(private http: HttpClient) { }

  getExerciseByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${name}`, { headers: this.headers });
  }
  // exercise.service.ts
getAllExercises(): Observable<any[]> {
  return this.http.get<any[]>('https://exercisedb.p.rapidapi.com/exercises', { headers: this.headers });
}

}

