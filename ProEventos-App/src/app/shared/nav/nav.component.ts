import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/models/User';
import { Funcao } from 'src/models/Enum/Funcao.enum'; // 1. Importar o Enum

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  private router = inject(Router);
  public authService = inject(AuthService);

  // Esta função já esconde o menu na tela de login
  showmenu(): boolean {
    return this.router.url !== '/user/login' && this.router.url !== '/user/registration';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/user/login']);
  }

  /**
   * Converte a 'funcao' (string) do JSON
   * para o tipo numérico do Enum ou string.
   */
  private getFuncao(user: any): string | Funcao {
    if (!user) return Funcao.NaoInformado;
    const userRoleString: string = user.funcao;

    // Retorna a string se for "Admin", "Palestrante", etc.
    if (isNaN(+userRoleString)) {
      return userRoleString;
    }
    
    // Retorna o número se for "3", "2", etc.
    return +userRoleString;
  }

  /**
   * Verifica se o utilizador logado é Admin.
   * (Chamado pelo HTML)
   */
  public isAdmin(user: any): boolean {
    const role = this.getFuncao(user);
    return role === Funcao.Admin || role === 'Admin';
  }

  /**
   * Verifica se o utilizador logado é Palestrante.
   * (Chamado pelo HTML)
   */
  public isPalestrante(user: any): boolean {
    const role = this.getFuncao(user);
    return role === Funcao.Palestrante || role === 'Palestrante';
  }

  /**
   * **** NOVO MÉTODO ****
   * Verifica se é Participante ou NaoInformado.
   * (Chamado pelo HTML)
   */
  public isParticipante(user: any): boolean {
    const role = this.getFuncao(user);
    return role === Funcao.Participante || role === 'Participante' ||
           role === Funcao.NaoInformado || role === 'NaoInformado';
  }
}