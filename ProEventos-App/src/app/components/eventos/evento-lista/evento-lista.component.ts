import { Component, inject, TemplateRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/models/Evento';
import { EventoService } from 'src/app/service/evento.service';
// Importe o Enum Funcao
import { Funcao } from 'src/models/Enum/Funcao.enum';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {

  private eventoService = inject(EventoService);
  private modalService = inject(BsModalService);
  private toastR = inject(ToastrService);
  private ngxSpinnerService = inject(NgxSpinnerService);
  private router = inject(Router);

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

  // ---- NOVAS PROPRIEDADES PARA CONTROLE DE CARGO ----
  public currentUserFuncao: Funcao = Funcao.NaoInformado;
  public isPalestrante: boolean = false;
  // ----------------------------------------------------

  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.setCurrentUserRole(); // <- Chame o novo método
    this.getEventos();
  }

  // ---- NOVO MÉTODO PARA PEGAR O CARGO DO USUÁRIO ----
  public setCurrentUserRole(): void {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      // Ajuste 'user.funcao' ou 'user.user.funcao' conforme sua estrutura no localStorage
      const userRole: Funcao = user?.funcao || user?.user?.funcao;

      if (userRole) {
        this.currentUserFuncao = userRole;
        this.isPalestrante = this.currentUserFuncao === Funcao.Palestrante;
      }
    }
    // Se não achar, 'isPalestrante' continuará 'false' (NaoInformado/Participante)
  }
  // ----------------------------------------------------

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

  // ... (o restante dos seus métodos get filtroLista, set filtroLista, openModal, etc. continuam iguais) ...

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

  editarEvento(id: number, event: MouseEvent): void {
    event.stopPropagation();
    this.router.navigate([`eventos/detalhes/`, id]);
  }

  // ---- NOVO MÉTODO PARA O BOTÃO RESERVAR ----
  reservarVaga(id: number, event: MouseEvent): void {
    event.stopPropagation(); // Impede o clique de ir para a linha (Redirecionardetalhes)
    this.ngxSpinnerService.show();

    // ... Crie a lógica de reserva aqui (ex: chamar um service) ...

    console.log(`Reservar vaga para o evento ID: ${id}`);
    this.toastR.info(`Funcionalidade "Reservar Vaga" (ID: ${id}) ainda não implementada.`, 'Aviso');
    setTimeout(() => this.ngxSpinnerService.hide(), 1000);
  }
}
