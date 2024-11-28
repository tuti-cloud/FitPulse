import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Yoga } from '../interfaces/yoga';

@Injectable({
  providedIn: 'root',
})
export class YogaService {
  private apiUrl = 'https://yoga-api-nzy4.onrender.com/v1/poses';

  constructor(private http: HttpClient) {}

  getYogaPoses(): Observable<Yoga[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((poses) => {
        console.log(poses); // Verifica lo que devuelve la API
        if (!Array.isArray(poses)) {
          throw new Error('La respuesta de la API no es un array.');
        }
        return poses.map((pose) => ({
          id: pose.id,
          name: pose.english_name || 'Nombre no disponible',
          breaths: Math.floor(Math.random() * (10 - 5 + 1)) + 5, // Número entre 5 y 10
          image: pose.image_url || 'assets/default-image.jpg',
        }));
      })
    );
  }
}






