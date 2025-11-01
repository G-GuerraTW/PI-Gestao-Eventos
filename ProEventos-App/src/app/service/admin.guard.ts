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
      // O seu JSON mais recente envia { "funcao": "Admin" }
      // A lógica foi atualizada para comparar a string "Admin"
      if (user && user.funcao === "Admin") { // <-- LÓGICA CORRIGIDA
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

