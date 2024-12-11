import { Component, inject, OnInit } from '@angular/core';
import { DatosService } from '../../servicios/datos.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import Swal from 'sweetalert2';

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

 serviciodatos = inject(DatosService);
 router = inject(Router);

  ngOnInit(): void {
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
    if (!this.registerUsername || !this.registerPassword) {
      Swal.fire({
        icon: "error",
        title: "Complete todos los campos",
        text: "Intentelo de nuevo",
      });
      return;  
    }
    
    if (this.serviciodatos.register({ username: this.registerUsername, password: this.registerPassword })) {
      Swal.fire({
        icon: "success",
        title: "Usuario Registrado Correctamente",
      });
      const container = document.querySelector(".container") as HTMLElement;
      container.classList.remove("sign-up-mode");
      this.router.navigate(['/modal-datos']);
    } else {
      Swal.fire({
        icon: "error",
        title: "Nombre de usuario en uso",
        text: "Intentelo De Nuevo Con Otro",
      });
    }
  }

  login(event: Event) {
    event.preventDefault();
    if (!this.loginUsername || !this.loginPassword) {
      Swal.fire({
        icon: "error",
        title: "Complete todos los campos",
        text: "Intentelo de nuevo",
      });
      return;
    }
    if (this.serviciodatos.login(this.loginUsername, this.loginPassword)) {
      Swal.fire({
        icon: "success",
        title: "Acceso Correcto",
      });
      this.router.navigate(['/eleccion']);
    } else {
      Swal.fire({
        icon: "error",
        title: "Credenciales Incorrectas",
        text: "Intentelo de nuevo",
      });
    }
  }

  togglePasswordVisibility(fieldId: string): void {
    const input = document.getElementById(fieldId) as HTMLInputElement;
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  }
}
