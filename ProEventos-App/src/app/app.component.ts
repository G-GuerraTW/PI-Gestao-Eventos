import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private authService = inject(AuthService);

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    let user : any;
    if(localStorage.getItem('user'))
      {
        user = JSON.parse(localStorage.getItem('user') ?? '{}');
      }
      else{
        user = null;
      }

      if(user) this.authService.setCurrentUser(user);
  }
}