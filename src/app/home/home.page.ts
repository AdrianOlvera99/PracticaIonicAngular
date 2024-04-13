import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userData: any;
  cartItemCount: number = 0;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      const userIdInt = parseInt(userId, 10);
      this.userData = this.userService.getUserData(); // Agrega un método para obtener los datos del usuario en AuthService
    } else {
      console.error('No se encontró el ID del usuario en sessionStorage');
    }
  }

  logout(): void {
    this.authService.logout();
  }

}
