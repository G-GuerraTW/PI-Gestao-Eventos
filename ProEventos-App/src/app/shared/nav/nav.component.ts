import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
// Não precisamos do Enum aqui, pois o JSON envia strings
// import { Funcao } from 'src/models/Enum/Funcao.enum';
import { User } from 'src/models/User'; // Assegure-se que este User é a interface correta

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  private router = inject(Router);
  public authService = inject(AuthService);

  // Esta função já esconde o menu na tela de login
  public showmenu(): boolean {
    return this.router.url !== '/user/login';
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/user/login']);
  }

  // --- FUNÇÕES DE LÓGICA DO MENU (CORRIGIDAS) ---

  /**
   * Verifica se o utilizador logado é Admin.
   * Compara a string recebida (ex: "Admin") com a string 'Admin'.
   */
  public isAdmin(user: any): boolean {
    return user && user.funcao === 'Admin';
  }

  /**
   * Verifica se o utilizador logado é Palestrante.
   * Compara a string recebida (ex: "Palestrante") com a string 'Palestrante'.
   */
  public isPalestrante(user: any): boolean {
    return user && user.funcao === 'Palestrante';
  }
}

