import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
 isCollapsed = true;

  private Router = inject(Router); 

  showmenu(): boolean 
  {
    return this.Router.url !== '/user/login';
  }
}
