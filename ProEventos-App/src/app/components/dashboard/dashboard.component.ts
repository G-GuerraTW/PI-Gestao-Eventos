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
  public percentEventosProximos: number = 0;
  public percentEventosRealizados: number = 0;

  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.carregarEventosDoPalestrante();
  }

  public carregarEventosDoPalestrante(): void {
    this.eventoService.getEventosByPalestrante().subscribe({
      next: (_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.totalEventos = _eventos.length;
        const hoje = new Date();
        this.eventosProximos = _eventos.filter(e => e.dataEvento && new Date(e.dataEvento) > hoje).length;
        this.eventosRealizados = _eventos.filter(e => e.dataEvento && new Date(e.dataEvento) <= hoje).length;

        if (this.totalEventos > 0) {
          this.percentEventosProximos = (this.eventosProximos / this.totalEventos) * 100;
          this.percentEventosRealizados = (this.eventosRealizados / this.totalEventos) * 100;
        } else {
          this.percentEventosProximos = 0;
          this.percentEventosRealizados = 0;
        }
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
