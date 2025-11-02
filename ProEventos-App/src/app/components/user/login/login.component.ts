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

        // --- INÍCIO DA CORREÇÃO ---
        
        // 1. Obter a função como string (ex: "Admin", "Palestrante", "1", "3")
        const userRoleString: string = user?.funcao;

        // 2. Converter a string para número (para comparar com o Enum)
        //    O '+' na frente de userRoleString força a conversão.
        //    (Isto funciona para "3" -> 3, mas falha para "Admin" -> NaN)
        //    Vamos usar uma lógica mais robusta que funciona para ambos:
        let userRole: Funcao;

        if (userRoleString === 'Admin') {
            userRole = Funcao.Admin;
        } else if (userRoleString === 'Palestrante') {
            userRole = Funcao.Palestrante;
        } else if (userRoleString === 'Participante') {
            userRole = Funcao.Participante;
        } else if (userRoleString === 'NaoInformado') {
            userRole = Funcao.NaoInformado;
        } else {
            // Se for um número (ex: "3"), converte para número
            userRole = +userRoleString; 
        }

        // 3. Fazer a comparação correta (número vs número)
        if (userRole === Funcao.Admin || userRole === Funcao.Palestrante) {
          this.toastR.success('Login efetuado com sucesso!', 'Sucesso');
          this.router.navigate(['/dashboard']);
        } else {
          // Utilizador é Participante ou NaoInformado (Visitante)
          this.toastR.success('Login efetuado com sucesso!', 'Sucesso');
          
          // 4. Corrigir o caminho da rota
          this.router.navigate(['/eventos/lista']); // Rota correta
        }
        // --- FIM DA CORREÇÃO ---
      },
      (error: any) => {
        console.error(error);
        this.toastR.error('Usuário ou senha inválidos');
      }
    );
  }
}
