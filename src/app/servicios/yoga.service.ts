import { Injectable } from '@angular/core';
import { Yoga } from '../interfaces/yoga';

@Injectable({
  providedIn: 'root',
})
export class YogaService {
  private apiUrl = 'https://yoga-api-nzy4.onrender.com/v1/poses'; // URL de la API

  /**
   * Obtiene las posturas de yoga desde la API usando fetch con una Promise.
   */
  getYogaPoses(): Promise<Yoga[]> {
    return fetch(this.apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then((poses) => {
        // Formatear los datos antes de devolverlos
        return poses.map((pose: any) => ({
          name: pose.english_name || 'Nombre no disponible',
          image: pose.url_png || 'img.jpg',
        }));
      })
      .catch((error) => {
        // Manejo de errores
        throw error;
      });
  }
}












