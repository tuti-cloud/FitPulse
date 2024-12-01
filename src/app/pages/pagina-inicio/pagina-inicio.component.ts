import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
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
  flashcards: NodeListOf<HTMLElement> | null = null;
  currentIndex: number = 0; // Índice de la flashcard visible actualmente
  isScrolling: boolean = false; // Evita múltiples transiciones simultáneas
  private customCursor!: HTMLElement; // Referencia al cursor personalizado
  private boundWheelScroll: (event: WheelEvent) => void; // Contexto enlazado del evento

  constructor(private elementRef: ElementRef) {
    // Enlazar el contexto de la función onWheelScroll
    this.boundWheelScroll = this.onWheelScroll.bind(this);
  }

  ngOnInit(): void {
    // Inicializar las flashcards
    this.flashcards = document.querySelectorAll('.flashcard');

    if (this.flashcards) {
      this.flashcards.forEach((card, index) => {
        if (index === 0) {
          card.classList.add('visible'); // La primera flashcard es visible inicialmente
        } else {
          card.classList.add('hidden'); // Las demás están ocultas
        }
      });
    }

    // Manejar el evento de scroll
    window.addEventListener('wheel', this.boundWheelScroll, { passive: false });

    // Inicializar el cursor personalizado
    this.initCustomCursor();
  }

  ngAfterViewInit(): void {
    this.loadSplineObject(); // Cargar el objeto Spline
  }

  private loadSplineObject(): void {
    const splineContainer = this.elementRef.nativeElement.querySelector('#spline-container');
    if (splineContainer) {
      const iframe = document.createElement('iframe');
      iframe.src = this.splineUrl;
      iframe.frameBorder = '0';
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.allow = 'autoplay';
      splineContainer.appendChild(iframe);
    }
  }

  onWheelScroll(event: WheelEvent): void {
    if (!this.flashcards) return;

    if (this.isScrolling) {
      event.preventDefault(); // Bloquear scroll mientras hay una transición activa
      return;
    }

    const section2 = document.querySelector('.section-2') as HTMLElement;
    const rect = section2.getBoundingClientRect();

    if (rect.top > 0 && rect.bottom > window.innerHeight) {
      // Scroll fuera de la sección de flashcards, comportamiento normal
      return;
    }

    event.preventDefault(); // Bloquear el scroll predeterminado en la sección de flashcards

    if (event.deltaY > 0 && this.currentIndex < this.flashcards.length - 1) {
      // Scroll hacia abajo y no estamos en la última flashcard
      this.showNextCard();
    } else if (event.deltaY < 0 && this.currentIndex > 0) {
      // Scroll hacia arriba y no estamos en la primera flashcard
      this.showPreviousCard();
    } else if (event.deltaY < 0 && this.currentIndex === 0) {
      // En la primera flashcard, permitir scroll hacia arriba para salir
      this.enableScrollToPreviousSection();
    } else if (event.deltaY > 0 && this.currentIndex === this.flashcards.length - 1) {
      // En la última flashcard, permitir scroll hacia abajo para salir
      this.enableScrollToNextSection();
    }
  }

  showNextCard(): void {
    if (this.flashcards && this.currentIndex < this.flashcards.length - 1) {
      const currentCard = this.flashcards[this.currentIndex];
      const nextCard = this.flashcards[this.currentIndex + 1];

      currentCard.classList.remove('visible');
      currentCard.classList.add('hidden');
      nextCard.classList.remove('hidden');
      nextCard.classList.add('visible');

      this.currentIndex++;
      this.startTransitionCooldown();
    }
  }

  showPreviousCard(): void {
    if (this.flashcards && this.currentIndex > 0) {
      const currentCard = this.flashcards[this.currentIndex];
      const previousCard = this.flashcards[this.currentIndex - 1];

      currentCard.classList.remove('visible');
      currentCard.classList.add('hidden');
      previousCard.classList.remove('hidden');
      previousCard.classList.add('visible');

      this.currentIndex--;
      this.startTransitionCooldown();
    }
  }

  private startTransitionCooldown(): void {
    this.isScrolling = true;
    setTimeout(() => (this.isScrolling = false), 1000); // 1 segundo para transiciones suaves
  }

  private enableScrollToPreviousSection(): void {
    this.isScrolling = true;

    // Eliminar temporalmente el listener de scroll
    window.removeEventListener('wheel', this.boundWheelScroll);

    setTimeout(() => {
      this.isScrolling = false;

      // Reanudar el listener de scroll después de un breve periodo
      window.addEventListener('wheel', this.boundWheelScroll, { passive: false });
    }, 500);
  }

  private enableScrollToNextSection(): void {
    this.isScrolling = true;

    // Eliminar temporalmente el listener de scroll
    window.removeEventListener('wheel', this.boundWheelScroll);

    setTimeout(() => {
      this.isScrolling = false;

      // Reanudar el listener de scroll después de un breve periodo
      window.addEventListener('wheel', this.boundWheelScroll, { passive: false });
    }, 500);
  }

  private initCustomCursor(): void {
    this.customCursor = document.querySelector('.custom-cursor') as HTMLElement;

    if (!this.customCursor) return;

    document.addEventListener('mousemove', (event) => {
      const x = event.clientX;
      const y = event.clientY;

      this.customCursor.style.left = `${x}px`;
      this.customCursor.style.top = `${y}px`;
    });

    document.addEventListener('mousedown', () => {
      this.customCursor.classList.add('click');
    });

    document.addEventListener('mouseup', () => {
      this.customCursor.classList.remove('click');
    });
  }
}






    



