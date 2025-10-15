import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient); 
  baseURL = 'http://localhost:5241/api/Account/Register';

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseURL, user);
  }
}
