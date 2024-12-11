import { Injectable } from '@angular/core';
import { Exercise } from '../interfaces/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private apiUrl = 'https://exercisedb.p.rapidapi.com/exercises';
  private headers = {
    'X-RapidAPI-Key': 'f675e24c8emsh869ab407a22c109p10bb81jsn03a645413fc8',  
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com' 
  };

  getExercisesByBodyPart(target: string): Promise<Exercise[]> {
    const url = `${this.apiUrl}/target/${target}`;
    console.log(`Llamando a la API: ${url}`);

    return fetch(url, { headers: this.headers })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error('Error en la llamada a la API:', error);
        throw error;
      });
  }
}
