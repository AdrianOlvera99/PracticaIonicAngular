import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  getUserData(): any {
    const userDataStr = sessionStorage.getItem('userData');
    return userDataStr ? JSON.parse(userDataStr) : null;
  }

  getUserId(): number | null {
    const userData = this.getUserData();
    return userData ? userData.id : null;
  }

}