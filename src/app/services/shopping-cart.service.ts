import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private apiUrl: string = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private userService: UserService) { }

  getUserShoppingCart(): Observable<any[]> {
    const userId = this.userService.getUserId(); // Obtener el ID del usuario logueado
    console.log('ID del usuario logueado:', userId); // Agregar console.log para verificar el ID del usuario
    if (userId) {
      return this.http.get<any>(`${this.apiUrl}/${userId}`).pipe(
        map((user: any) => {
          console.log('Carrito de compras del usuario:', user.shoppingCart); // Agregar console.log para verificar el carrito de compras
          return user.shoppingCart;
        }),
        catchError(error => {
          throw new Error('No se pudo obtener el carrito de compras del usuario');
        })
      );
    } else {
      throw new Error('No se pudo obtener el ID del usuario logueado');
    }
  }

  addToCart(productId: number): Observable<any> {
    const userId = this.userService.getUserId();
    if (userId) {
      return this.http.post(`${this.apiUrl}/${userId}/shopping-cart`, { productId }).pipe(
        catchError(error => {
          throw new Error('No se pudo agregar el producto al carrito');
        })
      );
    } else {
      throw new Error('No se pudo obtener el ID del usuario logueado');
    }
  }
}
