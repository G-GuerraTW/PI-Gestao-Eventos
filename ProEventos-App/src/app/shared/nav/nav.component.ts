import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/models/User';
// 1. IMPORTE O SEU ENUM
import { Funcao } from 'src/models/Enum/Funcao.enum';

@Component({
 selector: 'app-nav',
 templateUrl: './nav.component.html',
 styleUrls: ['./nav.component.scss']
})
export class NavComponent {
 
 // O inject já torna o service acessível
 private router = inject(Router);
 public authService = inject(AuthService);

 // Esta propriedade não é realmente usada, mas não faz mal
 user: User | null = null; 

 // Esta função já esconde o menu na tela de login
 showmenu(): boolean {
  return this.router.url !== '/user/login';
 }

 logout() {
  this.authService.logout();
  this.router.navigate(['/user/login']);
 }

 // =============================================
 // LÓGICA DE VERIFICAÇÃO (NOVO)
 // =============================================
 
 /** Converte a 'funcao' (string "2", "3", etc.) para um número */
 private getUserFuncaoAsNumber(user: any): number {
   // O '+' na frente de user.funcao transforma a string "3" no número 3
   // O '|| 0' garante que se for nulo, é 'NaoInformado'
   return +user?.funcao || 0;
 }

 /** Verifica se o utilizador é um Palestrante */
 public isPalestrante(user: any): boolean {
   // Compara o número 2 com o enum Funcao.Palestrante (que é 2)
   return this.getUserFuncaoAsNumber(user) === Funcao.Palestrante;
 }

 /** Verifica se o utilizador é um Admin */
 public isAdmin(user: any): boolean {
   // Compara o número 3 com o enum Funcao.Admin (que é 3)
   return this.getUserFuncaoAsNumber(user) === Funcao.Admin;
 }
 // =============================================
}

