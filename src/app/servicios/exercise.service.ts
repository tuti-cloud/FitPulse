import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from '../interfaces/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  getExerciseByName(translatedName: string) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://exercisedb.p.rapidapi.com/exercises';
  private headers = new HttpHeaders({
    'X-RapidAPI-Key': '194644aa73mshf2beeb524f60d38p176e48jsn5c1ba658a958',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  });

  constructor(private http: HttpClient) { }

  // getExerciseByName(name: string): Observable<Exercise[]> {
  //   return this.http.get<Exercise[]>(`${this.apiUrl}/name/${name}`, { headers: this.headers });
  // }

  // getAllExercises(): Observable<Exercise[]> {
  //   return this.http.get<Exercise[]>('https://exercisedb.p.rapidapi.com/exercises', { headers: this.headers });
  // }


  
    getExercisesByBodyPart(target: string): Observable<Exercise[]> {
      const url = `${this.apiUrl}/target/${target}`;
      console.log(`Llamando a la API: ${url}`);
      return this.http.get<Exercise[]>(url, { headers: this.headers });
    }
  }
  

