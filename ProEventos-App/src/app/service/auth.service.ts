import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/models/User';
import { Login } from 'src/models/Login';
import { environment } from 'src/enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSource = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSource.asObservable();

  ;
  baseURL = `${environment.baseUrl}/Account/Login`;

  constructor(private http: HttpClient) { }

  public login(model: Login): Observable<any> {
    return this.http.post<Login>(this.baseURL, model).pipe(
      tap((response: any) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  public setCurrentUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }
  
  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  public get currentUser(): any {
    return this.currentUserSource.value;
  }
}
