import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pagina-inicio',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.scss']
})
export class PaginaInicioComponent implements OnInit, AfterViewInit {
  
  splineUrl: string = 'https://my.spline.design/untitled-65d38539d62bc8f679abf7d45988bad6/';
  iframe: HTMLIFrameElement | null = null;

  flashcards: NodeListOf<Element> | null = null;
  currentIndex: number = 0;

  ngOnInit(): void {
    this.flashcards = document.querySelectorAll('.flashcard');
    
    if (this.flashcards && this.flashcards.length > 0) {
      this.flashcards[0].classList.add('visible');
    }
    window.addEventListener('wheel', this.onWheelScroll.bind(this));
  }

  ngAfterViewInit(): void {
    this.iframe = document.createElement('iframe');
    this.iframe.src = this.splineUrl;
    this.iframe.width = '100%';
    this.iframe.height = '100%';
    this.iframe.style.border = 'none';
    document.getElementById('spline-container')?.appendChild(this.iframe);
  }

  showNextCard(): void {
    if (this.flashcards && this.currentIndex < this.flashcards.length - 1) {
      this.flashcards[this.currentIndex].classList.remove('visible');
      this.flashcards[this.currentIndex].classList.add('hidden');
      this.flashcards[this.currentIndex].classList.add('previous');
      
      this.flashcards[this.currentIndex + 1].classList.add('visible');
      this.flashcards[this.currentIndex + 1].classList.remove('next');
      
      this.currentIndex++;
    }
  }

  showPreviousCard(): void {
    if (this.flashcards && this.currentIndex > 0) {
      this.flashcards[this.currentIndex].classList.remove('visible');
      this.flashcards[this.currentIndex].classList.add('hidden');
      this.flashcards[this.currentIndex].classList.add('next');
      
      this.flashcards[this.currentIndex - 1].classList.add('visible');
      this.flashcards[this.currentIndex - 1].classList.remove('previous');
      
      this.currentIndex--;
    }
  }

  onWheelScroll(event: WheelEvent): void {
    if (event.deltaY > 0) {
      this.showNextCard();
    } else {
      this.showPreviousCard();
    }
  }
}


    



