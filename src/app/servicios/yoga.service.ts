import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Yoga } from '../interfaces/yoga';

@Injectable({
  providedIn: 'root',
})
export class YogaService {
  private apiUrl = 'https://yoga-api-nzy4.onrender.com/v1/poses'; // URL de la API

  constructor() {}

  /**
   * Obtiene las posturas de yoga desde la API usando fetch.
   */
  getYogaPoses(): Observable<Yoga[]> {
    return new Observable<Yoga[]>((observer) => {
      fetch(this.apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al obtener los datos');
          }
          return response.json();
        })
        .then((poses) => {
          const formattedPoses = poses.map((pose: any) => ({
            name: pose.english_name || 'Nombre no disponible',
            image: pose.url_png || 'assets/default-image.jpg',
          }));
          observer.next(formattedPoses);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}












