import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DatosService } from './datos.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  serviciodatos=inject(DatosService);
   router= inject (Router);

  ngOnInit(): void {
    this.serviciodatos = new DatosService();
    this.router = new Router();
  }

  canActivate(): boolean {
    if (this.serviciodatos.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
