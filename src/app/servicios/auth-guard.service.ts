import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DatosService } from './datos.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private datosService = inject(DatosService);
  private router = inject(Router);

  canActivate(): boolean {
    if (this.datosService.isLoggedIn()) {
      return true; // Acceso permitido
    } else {
      this.router.navigate(['/login']); // Redirige al login si no está logueado
      return false; // Bloquea el acceso
    }
  }
}
