import { Routes } from '@angular/router';
import { PaginaInicioComponent } from './pages/pagina-inicio/pagina-inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { ElegirEjerciciosComponent } from './pages/elegir-ejercicios/elegir-ejercicios.component';
import { YogaComponent } from './pages/yoga/yoga.component';
import { ModalDatosComponent } from './pages/modal-datos/modal-datos.component';
import { SeleccionDeEjerciciosComponent } from './seleccion-de-ejercicios/seleccion-de-ejercicios.component';
import { EleccionComponent } from './pages/eleccion/eleccion.component';
import { AuthGuard } from './servicios/auth-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: '/pagina-inicio', pathMatch: 'full' },

  { path: 'pagina-inicio', component: PaginaInicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'elegir-ejercicios', component: ElegirEjerciciosComponent, canActivate: [AuthGuard] },
  { path: 'modal-datos', component: ModalDatosComponent},
  { path: 'yoga', component: YogaComponent , canActivate: [AuthGuard]},
  { path: 'seleccion-de-ejercicios', component: SeleccionDeEjerciciosComponent , canActivate: [AuthGuard]},
  { path: 'eleccion', component: EleccionComponent, canActivate: [AuthGuard]  },
];
