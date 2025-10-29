import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
class AdminPermissionsService {
  
  constructor(private router: Router, private toastR: ToastrService) {}

  canActivate(): boolean {
    const userJSON = localStorage.getItem('user');
    
    if (userJSON) {
      const user = JSON.parse(userJSON);
      
      // ---- CORREÇÃO AQUI ----
      // O seu JSON de admin tem { "funcao": "3" }
      // O seu código estava a comparar a string "3" com a string "Admin" (o que dá falso).
      // A comparação correta é com a string "3".
      if (user && user.funcao === "3") { // <-- LÓGICA CORRIGIDA
        return true;
      }
    }

    // Se não for admin (ou não estiver logado)...
    this.toastR.error('Acesso não autorizado. Esta área é restrita.', 'ERRO');
    this.router.navigate(['/dashboard']);
    return false;
  }
}

// Exportamos a função 'CanActivateFn' moderna
export const AdminGuard: CanActivateFn = (route, state): boolean => {
  return inject(AdminPermissionsService).canActivate();
};

