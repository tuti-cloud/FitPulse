import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

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
  }
  

