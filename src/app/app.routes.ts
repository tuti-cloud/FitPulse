// app/app.routes.ts
import { Routes } from '@angular/router';
import { RutinaComponent } from '../rutina/rutina.component'; 

export const routes: Routes = [
  { path: 'rutina', component: RutinaComponent },
  { path: '', redirectTo: '/rutina', pathMatch: 'full' }, 

  
];
