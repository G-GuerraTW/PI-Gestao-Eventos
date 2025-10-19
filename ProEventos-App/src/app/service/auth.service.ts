import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {  tap } from 'rxjs/operators';
import { User } from 'src/models/User';
import { Login } from 'src/models/Login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSource = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSource.asObservable();

  baseURL = 'http://localhost:7086/api/Account/';

  constructor(private http: HttpClient) { }

  public login(model: Login): Observable<any> {
    return this.http.post<Login>(this.baseURL + 'Login', model).pipe(
      tap((response: any) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  public setCurrentUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  public get currentUser(): any {
    return this.currentUserSource.value;
  }
}
