import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Funcao } from 'src/models/Enum/Funcao.enum';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      const userRole: Funcao = user?.funcao || user?.user?.funcao;

      if (userRole === Funcao.Palestrante) {
        return true;
      }
    }
    
    this.router.navigate(['/user-view']);
    return false;
  }
}
