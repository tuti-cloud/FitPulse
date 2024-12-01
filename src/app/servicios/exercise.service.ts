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
    'X-RapidAPI-Key': '26790f18edmshd9dd7dbc10050dbp11c1f3jsnf4ae0282b999',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  });

  constructor(private http: HttpClient) { }

 


  
    getExercisesByBodyPart(target: string): Observable<Exercise[]> {
      const url = `${this.apiUrl}/target/${target}`;
      console.log(`Llamando a la API: ${url}`);
      return this.http.get<Exercise[]>(url, { headers: this.headers });
    }
  }
  

