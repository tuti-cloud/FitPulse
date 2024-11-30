import { Component, inject, OnInit } from '@angular/core';
import { DatosService } from '../../servicios/datos.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUsername: string = '';
  loginPassword: string = '';
  registerUsername: string = '';
  registerPassword: string = '';

 serviciodatos=inject(DatosService);

  ngOnInit(): void {
    this.serviciodatos = new DatosService();

    const signInBtn = document.querySelector("#sign-in-btn") as HTMLElement;
    const signUpBtn = document.querySelector("#sign-up-btn") as HTMLElement;
    const container = document.querySelector(".container") as HTMLElement;

    signUpBtn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });

    signInBtn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
  }

  register() {
    if (this.serviciodatos.register({ username: this.registerUsername, password: this.registerPassword })) {
      alert('Usuario registrado exitosamente.');
      const container = document.querySelector(".container") as HTMLElement;
      container.classList.remove("sign-up-mode");
    } else {
      alert('El nombre de usuario ya existe.');
    }
  }

  login() {
    if (this.serviciodatos.login(this.loginUsername, this.loginPassword)) {
      localStorage.setItem('currentUser', this.loginUsername);
      alert('Login exitoso.');
    } else {
      alert('Nombre de usuario o contraseña incorrectos.');
    }
  }
}
