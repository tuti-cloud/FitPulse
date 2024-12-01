import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegirEjerciciosComponent } from './elegir-ejercicios.component';

describe('ModalComponent', () => {
  let component: ElegirEjerciciosComponent;
  let fixture: ComponentFixture<ElegirEjerciciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElegirEjerciciosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElegirEjerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
