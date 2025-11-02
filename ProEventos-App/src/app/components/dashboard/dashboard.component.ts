import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/models/Evento';
import { EventoService } from 'src/app/service/evento.service';
import { AuthService } from 'src/app/service/auth.service'; // Import AuthService

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private eventoService = inject(EventoService);
  private toastR = inject(ToastrService);
  private ngxSpinnerService = inject(NgxSpinnerService);
  private router = inject(Router);
  public authService = inject(AuthService); // Inject AuthService

  public eventos: Evento[] = [];
  public totalEventos: number = 0;
  public eventosProximos: number = 0;
  public eventosRealizados: number = 0;

  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.carregarEventosDoPalestrante();
  }

  public carregarEventosDoPalestrante(): void {
    this.eventoService.getEventosByPalestrante().subscribe({
      next: (_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.totalEventos = _eventos.length;
        this.eventosProximos = _eventos.filter(e => new Date() > new Date()).length;
        this.eventosRealizados = this.totalEventos - this.eventosProximos;
      },
      error: (error: any) => {
        this.ngxSpinnerService.hide();
        this.toastR.error(`Erro ao carregar eventos: ${error.message}`);
      },
      complete: () => this.ngxSpinnerService.hide(),
    });
  }

  public detalheEvento(id: number): void {
    this.router.navigate([`eventos/detalhes/${id}`]);
  }
}
