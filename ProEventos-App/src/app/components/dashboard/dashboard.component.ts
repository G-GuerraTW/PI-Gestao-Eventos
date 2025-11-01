import { Component, inject, TemplateRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/models/Evento';
import { EventoService } from 'src/app/service/evento.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private eventoService = inject(EventoService);
  private modalService = inject(BsModalService);
  private toastR = inject(ToastrService);
  private ngxSpinnerService = inject(NgxSpinnerService);
  private router = inject(Router);

  // modal
  modalRef?: BsModalRef;
  message?: string;

  public eventos: Evento[] = [];
  public idEventoExclusao: number | null = null;
  public temaEventoExclusao: string | null = null;

  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.carregarEventos();
  }

  public carregarEventos(): void {
    const observer = {
      next: (_eventos: Evento[]) => {
        this.eventos = _eventos;
      },
      error: (error: any) => {
        this.ngxSpinnerService.hide();
        this.toastR.error(`Erro inesperado: ${error.message}`);
      },
      complete: () => this.ngxSpinnerService.hide(),
    };

    this.eventoService.getEvento().subscribe(observer);
  }

  openModal(template: TemplateRef<unknown>, event: MouseEvent, tema: string, eventoID: number) {
    event.stopPropagation();
    this.idEventoExclusao = eventoID;
    this.temaEventoExclusao = tema;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    if(this.idEventoExclusao != null)
    {
      this.ngxSpinnerService.show();
      this.eventoService.deleteEvento(this.idEventoExclusao).subscribe(
        {
          next: () =>
            {
              this.toastR.success(`Evento excluido com sucesso.`, 'Deletado!');
              this.carregarEventos();
              this.modalRef?.hide();
              this.ngxSpinnerService.hide();
            },
          error: (err) =>
            {
              this.toastR.error(`Erro ao deletar Evento: ${err.message}`);
              this.ngxSpinnerService.hide();
            }
        })
    }

    this.idEventoExclusao = null;
    this.temaEventoExclusao = null;
    this.modalRef?.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }

  editarEvento(id: number, event: MouseEvent): void {
    event.stopPropagation();
    this.router.navigate([`eventos/detalhes/`, id]);
  }
}
