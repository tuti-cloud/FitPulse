// app/app.routes.ts
import { Routes } from '@angular/router';
import { RutinaComponent } from './pages/rutina/rutina.component'; 
import { PaginaInicioComponent } from './pages/pagina-inicio/pagina-inicio.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { LoginComponent } from './pages/login/login.component';
import { ModalComponent } from './pages/modal/modal.component';
import { YogaComponent } from './pages/yoga/yoga.component';
import { ModalDatosComponent } from './pages/modal-datos/modal-datos.component';

export const routes: Routes = [
  { path: 'rutina', component: RutinaComponent },
  { path: '', redirectTo: '/pagina-inicio', pathMatch: 'full' }, 

  { path: 'pagina-inicio', component: PaginaInicioComponent },
  {path: 'registrarse' , component:RegistrarseComponent},
  { path: 'login', component:LoginComponent},
  {path: 'modal', component:ModalComponent},
  {path:'modal-datos', component:ModalDatosComponent},
  {path:'yoga', component:YogaComponent}
];
