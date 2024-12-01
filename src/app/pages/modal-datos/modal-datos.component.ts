import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-datos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './modal-datos.component.html',
  styleUrl: './modal-datos.component.scss',
})
export class ModalDatosComponent {
  selectedGender: string = '';
  edad: string = '';
  altura: string = '';
  peso: string = '';

  selectGender(gender: string): void {
    this.selectedGender = gender;
  }

  canStart(): boolean {
    return (
      this.selectedGender !== '' &&
      this.edad !== '' &&
      this.altura !== '' &&
      this.peso !== ''
    );
  }

  start(): void {
    if (!this.canStart()) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos antes de continuar.',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
    } else {
      // Lógica para avanzar si los datos están completos
      console.log('Todos los campos están completos. Continuar.');
    }
  }
}

  
  

