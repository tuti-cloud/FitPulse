import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './elegir-ejercicios.component.html',
  styleUrl: './elegir-ejercicios.component.scss'
})
export class ElegirEjerciciosComponent {

    selectedOptions: string[] = [];
  
    selectOption(option: string): void {
      const index = this.selectedOptions.indexOf(option);
      if (index === -1) {
        this.selectedOptions.push(option);
      } else {
        this.selectedOptions.splice(index, 1);
      }
    }
  
    isOptionSelected(option: string): boolean {
      return this.selectedOptions.includes(option);
    }
  
    canStart(): boolean {
      return this.selectedOptions.length > 0;
    }
  
getRouterLink(): any[] {
  return['/seleccion-de-ejercicios',{selectedOptions: this.selectedOptions.join(',')}];
  
}

  }
  
  

