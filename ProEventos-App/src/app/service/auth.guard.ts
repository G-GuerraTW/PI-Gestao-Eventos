import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private authService = inject(AuthService);
  private router = inject(Router);
  private toastR = inject(ToastrService);

  canActivate(){
    return this.authService.currentUser$.pipe(
      map((user) => {
        if(user) return true;

        this.toastR.info('Usuario não autenticado.');
        this.router.navigate(['/user/login']);
        return false;
      })
    )
  }
}