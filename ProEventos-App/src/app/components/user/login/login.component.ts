import { Login } from './../../../../models/Login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginData: Login = {
    userName: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.loginData).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      },
      (error: any) => {
        console.error(error);
        alert('Usuário ou senha inválidos');
      }
    );
  }
}
