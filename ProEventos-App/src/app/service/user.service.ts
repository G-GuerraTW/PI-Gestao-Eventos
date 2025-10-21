import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  baseURL = `${environment.baseUrl}/Account`

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseURL}/Register`, user);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.baseURL}/getUser`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseURL}/updateUser`, user);
  }
}
