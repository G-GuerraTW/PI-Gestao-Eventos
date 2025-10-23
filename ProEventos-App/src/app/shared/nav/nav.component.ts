import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/models/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  

  private router = inject(Router);
  public authService = inject(AuthService);

  user: User | null = null;

  showmenu(): boolean {
    return this.router.url !== '/user/login';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/user/login']);
  }
}
