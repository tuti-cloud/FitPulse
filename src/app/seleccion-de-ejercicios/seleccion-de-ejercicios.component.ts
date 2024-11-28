import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-seleccion-de-ejercicios',
  standalone: true,
  imports: [CommonModule,RouterModule,HeaderComponent],
  templateUrl: './seleccion-de-ejercicios.component.html',
  styleUrl: './seleccion-de-ejercicios.component.scss'
})
export class SeleccionDeEjerciciosComponent {

    selectedOptions: string[] = [];
  
    constructor(private route: ActivatedRoute) { }
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.selectedOptions = params['selectedOptions'] ? params['selectedOptions'].split(',') : [];
      });
    }
    
  }
  
  
  

