import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '../interfaces/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private apiUrl = 'https://exercisedb.p.rapidapi.com/exercises';
<<<<<<< HEAD
  private headers = new HttpHeaders({
=======
  private headers = {
>>>>>>> 1684dedddaff97d20f548887f369692ba24d0381
    'X-RapidAPI-Key': '26790f18edmshd9dd7dbc10050dbp11c1f3jsnf4ae0282b999',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  };

  constructor() { }

<<<<<<< HEAD
 


  
    getExercisesByBodyPart(target: string): Observable<Exercise[]> {
      const url = `${this.apiUrl}/target/${target}`;
      console.log(`Llamando a la API: ${url}`);
      return this.http.get<Exercise[]>(url, { headers: this.headers });
    }
=======
  getExercisesByBodyPart(target: string): Observable<Exercise[]> {
    const url = `${this.apiUrl}/target/${target}`;
    console.log(`Llamando a la API: ${url}`);

    return new Observable<Exercise[]>((observer) => {
      fetch(url, { headers: this.headers })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener los datos');
          }
          return response.json();
        })
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
>>>>>>> 1684dedddaff97d20f548887f369692ba24d0381
  }
}



