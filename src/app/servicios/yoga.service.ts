import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Yoga } from '../interfaces/yoga';

@Injectable({
  providedIn: 'root',
})
export class YogaService {
  private apiUrl = 'https://yoga-api-nzy4.onrender.com/v1/poses'; // URL de la API de Yoga
  private apiHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getYogaPoses(): Observable<Yoga[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.apiHeaders }).pipe(
      map((poses) => {
        console.log(poses); // Verifica la respuesta de la API
        return poses.map((pose) => ({
          name: pose.english_name || 'Nombre no disponible',  // Nombre de la postura
          image: pose.url_png || 'assets/default-image.jpg',  // Imagen de la postura (si no existe, usa imagen por defecto)
        }));
      })
    );
  }
}










