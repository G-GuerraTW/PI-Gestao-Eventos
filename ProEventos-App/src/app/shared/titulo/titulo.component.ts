import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent {

  //injeções
  private router = inject(Router)
  private route = inject(ActivatedRoute)

  @Input() titulo: string | undefined;
  @Input() iconClass = 'fa fa-user';
  @Input() subtitulo =  'Desde 2025'
  @Input() botaoListar = false;

  redirecionarListagem(): void {
    this.router.navigate(['lista'], {relativeTo: this.route})
  }
}
