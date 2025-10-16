import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginData = {
    userName: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {

  }

  onSubmit() {
    const url = 'http://localhost:7086/api/Account/Login';

    this.http.post(url, this.loginData).subscribe({
      next: (response: any) => {
        console.log('Login bem-sucedido', response);


        localStorage.setItem('token', response.token);

        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Erro no login', error);
        alert('Usuário ou senha inválidos');
      }
    });
  }
}
