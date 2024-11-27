import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-modal-datos',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './modal-datos.component.html',
  styleUrl: './modal-datos.component.scss'
})
export class ModalDatosComponent {
    selectedGender: string = '';
  
    selectGender(gender: string): void {
      this.selectedGender = gender;
    }
  
    isGenderSelected(gender: string): boolean {
      return this.selectedGender === gender;
    }
  }
  

