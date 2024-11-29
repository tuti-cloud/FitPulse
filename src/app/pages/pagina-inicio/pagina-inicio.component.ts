import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-pagina-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.scss']
})
export class PaginaInicioComponent implements OnInit, AfterViewInit {
  splineUrl: string = 'https://my.spline.design/untitled-65d38539d62bc8f679abf7d45988bad6/';
  iframe: HTMLIFrameElement | null = null;
  flashcards: NodeListOf<HTMLElement> | null = null;
  currentIndex: number = 0; // Índice de la tarjeta visible actualmente
  isScrolling: boolean = false; // Evitar múltiples eventos de scroll simultáneos

  ngOnInit(): void {
    this.flashcards = document.querySelectorAll('.flashcard');

    if (this.flashcards) {
      // Inicializar las clases de las tarjetas
      this.flashcards.forEach((card, index) => {
        if (index === 0) {
          card.classList.add('visible'); // La primera tarjeta es visible
        } else if (index === 1) {
          card.classList.add('next'); // La segunda tarjeta está "siguiente"
        } else {
          card.classList.add('hidden'); // Las demás están ocultas
        }
      });
    }

    // Manejar el evento de scroll
    window.addEventListener('wheel', this.onWheelScroll.bind(this));
  }

  ngAfterViewInit(): void {
    // Aquí puedes agregar más lógica si necesitas cargar otros componentes, como iframes
  }

  onWheelScroll(event: WheelEvent): void {
    if (this.isScrolling) return; // Ignorar scroll si ya hay una transición en curso

    if (event.deltaY > 0) {
      this.showNextCard(); // Scroll hacia abajo
    } else {
      this.showPreviousCard(); // Scroll hacia arriba
    }

    this.isScrolling = true;
    setTimeout(() => (this.isScrolling = false), 1000); // Evitar que el evento se dispare varias veces rápidamente
  }

  showNextCard(): void {
    if (this.flashcards && this.currentIndex < this.flashcards.length - 1) {
      const currentCard = this.flashcards[this.currentIndex];
      const nextCard = this.flashcards[this.currentIndex + 1];

      // Actualizar clases
      currentCard.classList.remove('visible');
      currentCard.classList.add('previous');
      nextCard.classList.remove('next', 'hidden');
      nextCard.classList.add('visible');

      this.currentIndex++;
    }
  }

  showPreviousCard(): void {
    if (this.flashcards && this.currentIndex > 0) {
      const currentCard = this.flashcards[this.currentIndex];
      const previousCard = this.flashcards[this.currentIndex - 1];

      // Actualizar clases
      currentCard.classList.remove('visible');
      currentCard.classList.add('next');
      previousCard.classList.remove('previous', 'hidden');
      previousCard.classList.add('visible');

      this.currentIndex--;
    }
  }
}



    



