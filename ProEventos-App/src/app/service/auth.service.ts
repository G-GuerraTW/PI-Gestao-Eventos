import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _user = new BehaviorSubject<User | null>(null);
  user$ = this._user.asObservable();

  constructor() {
    // Exemplo: pegando do localStorage

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this._user.next(JSON.parse(storedUser));
    }
  }

  login(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this._user.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this._user.next(null);
  }

  get currentUser(): User | null {
    return this._user.value;
  }
}
