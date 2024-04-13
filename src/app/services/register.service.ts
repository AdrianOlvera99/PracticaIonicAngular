import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl: string = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  registerUser(userDetails: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userDetails);
  }

  getLastUserId(): Observable<number> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        if (users.length > 0) {
          const lastUser = users[users.length - 1];
          // Convertir el ID a número entero (int)
          return parseInt(lastUser.id, 10);
        } else {
          return 0; // Si no hay usuarios, devuelve 0 como último ID
        }
      })
    );
  }
}
