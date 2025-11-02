import { Login } from './../../../../models/Login';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Funcao } from './../../../../models/Enum/Funcao.enum';

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

  private toastR = inject(ToastrService);

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.loginData).subscribe(
      () => {
        const userJSON = localStorage.getItem('user');
        
        if (!userJSON) {
          this.toastR.error('Não foi possível obter os dados do usuário após o login.');
          this.router.navigate(['/user/login']); 
          return;
        }

        const user = JSON.parse(userJSON);
        const userRole: Funcao = user?.funcao || user?.user?.funcao;

        if (userRole === Funcao.Admin || userRole === Funcao.Palestrante) {
          this.toastR.success('Login efetuado com sucesso!', 'Sucesso');
          this.router.navigate(['/dashboard']);
        } else {
          this.toastR.success('Login efetuado com sucesso!', 'Sucesso');
          this.router.navigate(['/user-view']);
        }
      },
      (error: any) => {
        console.error(error);
        this.toastR.error('Usuário ou senha inválidos');
      }
    );
  }
}
