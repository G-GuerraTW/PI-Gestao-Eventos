import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { UserDTO } from 'src/models/DTOs/UserDTO';
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

  getUser(): Observable<UserDTO> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user?.token;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<UserDTO>(`${this.baseURL}/getUser`, { headers });
  }

  updateUser(user: UserDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(`${this.baseURL}/updateUser`, user);
  }
}
