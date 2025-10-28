import { Component } from '@angular/core';

@Component({
  selector: 'app-eventos',
  // O template dele deve ser apenas um router-outlet
  template: '<router-outlet></router-outlet>' 
})
export class EventosComponent {
  // Este componente não precisa de lógica,
  // ele apenas renderiza os componentes filhos da rota.
}
