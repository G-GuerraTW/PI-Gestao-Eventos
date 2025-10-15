import { Component, inject, TemplateRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/models/Evento';
import { EventoService } from 'src/app/service/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {

  private eventoService = inject(EventoService);       // ✔️ injeção correta
  private modalService = inject(BsModalService);      // ✔️ injeção do serviço de modal
  private toastR = inject(ToastrService);            // ✔️ injeção do package de aviso
  private ngxSpinnerService = inject(NgxSpinnerService);

  private router = inject(Router)

  // modal
  modalRef?: BsModalRef;
  message?: string;

  // Estilos
  isCollapsed = false;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];

  public _filtroLista = "";

  public idEventoExclusao: number | null = null;
  public temaEventoExclusao: string | null = null;


  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.getEventos();
  }

  public getEventos(): void {
    const observer = {
      next: (_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.eventosFiltrados = this.eventos;
      },
      error: (error: any) => {
        this.ngxSpinnerService.hide();
        this.toastR.error(`Erro inesperado: ${error.message}`);
      },
      complete: () => this.ngxSpinnerService.hide(),
    };

    this.eventoService.getEvento().subscribe(observer);
  }

    filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();

    return this.eventos.filter(evento =>
      evento.tema.toLocaleLowerCase().includes(filtrarPor) ||
      evento.local.toLocaleLowerCase().includes(filtrarPor)
    );
  }

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this._filtroLista
      ? this.filtrarEventos(this._filtroLista)
      : this.eventos;
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
              this.getEventos();
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

  Redirecionardetalhes(id: number) {
      this.router.navigate(['eventos/detalhes', id]);
  }
}
