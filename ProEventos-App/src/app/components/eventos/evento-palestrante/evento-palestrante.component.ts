import { Component, inject, TemplateRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/models/Evento';
import { EventoService } from 'src/app/service/evento.service';
// NOTA: Não precisamos mais importar Funcao ou AuthService aqui

@Component({
  selector: 'app-evento-palestrante',
  templateUrl: './evento-palestrante.component.html',
  styleUrls: ['./evento-palestrante.component.scss']
})
export class EventoPalestranteComponent implements OnInit {

  // Injeções de serviço
  private eventoService = inject(EventoService);
  private modalService = inject(BsModalService);
  private toastR = inject(ToastrService);
  private ngxSpinnerService = inject(NgxSpinnerService);
  private router = inject(Router);

  // Propriedades do componente
  modalRef?: BsModalRef;
  message?: string;
  isCollapsed = false;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];

  public _filtroLista = "";

  public idEventoExclusao: number | null = null;
  public temaEventoExclusao: string | null = null;
  
  // Não precisamos mais da propriedade 'isPalestrante' aqui

  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.getMeusEventos(); // Chamando o método que busca eventos do palestrante
  }

  public getMeusEventos(): void {
    const observer = {
      next: (_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.eventosFiltrados = this.eventos;
      },
      error: (error: any) => {
        this.ngxSpinnerService.hide();
        this.toastR.error(`Erro ao carregar seus eventos: ${error.message}`, 'Erro');
      },
      complete: () => this.ngxSpinnerService.hide(),
    };

    // Usando o novo método do serviço!
    this.eventoService.getEventosByPalestrante().subscribe(observer);
  }

  //
  // O restante do código é idêntico ao 'evento-lista.component.ts'
  // (Lógica de filtro, modal, delete, etc.)
  //

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
    event.stopPropagation(); // Impede o clique de ir para a linha (Redirecionardetalhes)
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
              this.toastR.success(`Evento excluído com sucesso.`, 'Deletado!');
              this.getMeusEventos(); // <-- Atualiza a lista chamando o método correto
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

  // Navega para a página de detalhes quando a linha é clicada
  Redirecionardetalhes(id: number) {
      this.router.navigate(['eventos/detalhes', id]);
  }

  // Navega para a página de detalhes (edição) quando o botão é clicado
  editarEvento(id: number, event: MouseEvent): void {
    event.stopPropagation(); // Impede o clique de ir para a linha (Redirecionardetalhes)
    this.router.navigate([`eventos/detalhes/`, id]);
  }
}