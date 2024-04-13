import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';
  userIdCounter: number = 0; // Contador para el ID de usuario

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Obtener el último ID de usuario registrado
    this.registerService.getLastUserId().subscribe(
      (lastUserId) => {
        this.userIdCounter = lastUserId + 1; // Incrementar el contador
      }
    );
  }

  ngOnInit() { }

  register() {
    if (this.registerForm.valid) {
      const newUser = {
        id: this.userIdCounter, // Asignar el ID utilizando el contador
        name: this.registerForm.value.name,
        lastName: this.registerForm.value.lastName,
        address: this.registerForm.value.address,
        phoneNumber: this.registerForm.value.phoneNumber,
        credentials: {
          username: this.registerForm.value.username,
          password: this.registerForm.value.password
        },
        shoppingCart: [] // Inicializar el carrito de compras como vacío
      };

      this.registerService.registerUser(newUser).subscribe(
        (response) => {
          console.log('Usuario registrado exitosamente:', response);
          // Redirigir a la página de inicio de sesión u otra página después del registro
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error al registrar usuario:', error);
          // Manejar errores de registro, como mostrar un mensaje al usuario
          this.errorMessage = 'Error al registrar usuario. Por favor, inténtalo de nuevo.';
        }
      );
    } else {
      this.errorMessage = 'Por favor, complete todos los campos.';
    }
  }
}
