// app/app.routes.ts
import { Routes } from '@angular/router';
// import { RutinaComponent } from './pages/rutina/rutina.component'; 
import { PaginaInicioComponent } from './pages/pagina-inicio/pagina-inicio.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { LoginComponent } from './pages/login/login.component';
import { ElegirEjerciciosComponent} from './pages/elegir-ejercicios/elegir-ejercicios.component';
import { YogaComponent } from './pages/yoga/yoga.component';
import { ModalDatosComponent } from './pages/modal-datos/modal-datos.component';
import { SeleccionDeEjerciciosComponent } from './seleccion-de-ejercicios/seleccion-de-ejercicios.component';
import { EleccionComponent } from './pages/eleccion/eleccion.component';
import { AuthGuard } from './servicios/auth-guard.service';
import { ResultadosComponent } from './resultados/resultados.component';

export const routes: Routes = [
  // { path: 'rutina', component: RutinaComponent },
  { path: '', redirectTo: '/pagina-inicio', pathMatch: 'full' }, 

  { path: 'pagina-inicio', component: PaginaInicioComponent },
  {path: 'registrarse' , component:RegistrarseComponent},
  { path: 'login', component:LoginComponent},
  {path: 'elegir-ejercicios', component:ElegirEjerciciosComponent , canActivate:[AuthGuard] },
  {path:'modal-datos', component:ModalDatosComponent},
  {path:'yoga', component:YogaComponent},
  {path:'seleccion-de-ejercicios', component:SeleccionDeEjerciciosComponent},
  {path:'eleccion', component:EleccionComponent},
  {path:'resultados', component:ResultadosComponent}
];
