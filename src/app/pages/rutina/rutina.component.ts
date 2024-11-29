// import { Component, inject, OnInit } from '@angular/core';
// import { ExerciseService } from '../../servicios/exercise.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HeaderComponent } from "../../components/header/header.component";

// @Component({
//   selector: 'app-rutina',
//   templateUrl: './rutina.component.html',
//   styleUrls: ['./rutina.component.scss'],
//   standalone: true,
//   imports: [CommonModule, FormsModule, HeaderComponent],
// })
// export class RutinaComponent implements OnInit {
//   exerciseOptions = ['press banca', 'curl de bíceps','Sentadilla',];
//   exerciseName1: string = '';
//   exerciseName2: string = '';
//   exerciseName3: string = '';
//   exercise1: any;
//   exercise2: any;
//   exercise3: any;
  
//   exerciseNameInSpanish1: string = ''; 
//   exerciseNameInSpanish2: string = ''; 
//   exerciseNameInSpanish3: string = ''; 

//   exerciseService = inject(ExerciseService);

//   private ejercicioTraducciones: { [key: string]: string } = {
//     'press banca': 'barbell bench press',
//     'curl de bíceps': 'bicep curl',
//     'Sentadilla':'barbell squat (on knees)',
    
//   };

//   ngOnInit(): void {
 
//   }

//   searchExercise1(): void {
//     const translatedName = this.ejercicioTraducciones[this.exerciseName1];
//     if (translatedName) {
//       this.exerciseService.getExerciseByName(translatedName).subscribe((data) => {
//         this.exercise1 = data[0]; 
//         this.exerciseNameInSpanish1 = this.exerciseName1; 
//       });
//     }
//   }

//   searchExercise2(): void {
//     const translatedName = this.ejercicioTraducciones[this.exerciseName2];
//     if (translatedName) {
//       this.exerciseService.getExerciseByName(translatedName).subscribe((data) => {
//         this.exercise2 = data[0]; 
//         this.exerciseNameInSpanish2 = this.exerciseName2; 
//       });
//     }
//   }
//   searchExercise3(): void {
//     const translatedName = this.ejercicioTraducciones[this.exerciseName3];
//     if (translatedName) {
//       this.exerciseService.getExerciseByName(translatedName).subscribe((data) => {
//         this.exercise3 = data[0]; 
//         this.exerciseNameInSpanish3 = this.exerciseName3; 
//       });
//     }
//   }
// }


