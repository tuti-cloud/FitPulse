import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionDeEjerciciosComponent } from './seleccion-de-ejercicios.component';

describe('SeleccionDeEjerciciosComponent', () => {
  let component: SeleccionDeEjerciciosComponent;
  let fixture: ComponentFixture<SeleccionDeEjerciciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionDeEjerciciosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionDeEjerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
