import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = 'http://localhost:3000/users';
  private tokenKey: string = 'authToken';
  private userIdKey: string = 'userId';

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?credentials.username=${username}&credentials.password=${password}`).pipe(
      map(response => {
        if (response.length > 0) {
          const token = 'mockToken123';
          const userId = parseInt(response[0].id, 10); // Convertir userId a número
          this.setToken(token);
          this.setUserId(userId);
          sessionStorage.setItem('userData', JSON.stringify(response[0])); // Almacenar los datos del usuario
          return { token, userId };
        } else {
          throw new Error('Credenciales inválidas');
        }
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  setToken(token: string) {
    sessionStorage.setItem(this.tokenKey, token);
  }

  setUserId(userId: number) {
    sessionStorage.setItem(this.userIdKey, userId.toString()); // Almacenar userId como cadena
  }

  getUserId(): number | null {
    const userIdStr = sessionStorage.getItem(this.userIdKey);
    return userIdStr ? parseInt(userIdStr, 10) : null; // Convertir userId de cadena a número
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.tokenKey);
  }

  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userIdKey);
    sessionStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

}
