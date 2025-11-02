import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/models/Ticket';
import { TicketService } from 'src/app/service/ticket.service';

@Component({
  selector: 'app-minhas-entradas',
  templateUrl: './minhas-entradas.component.html',
  styleUrls: ['./minhas-entradas.component.scss']
})
export class MinhasEntradasComponent implements OnInit {

  // Injeções de serviço
  private ticketService = inject(TicketService);
  private modalService = inject(BsModalService);
  private spinner = inject(NgxSpinnerService);
  private toastR = inject(ToastrService);

  // Propriedades do componente
  public tickets: Ticket[] = [];
  public ticketSelecionado: Ticket | null = null;
  public modalRef?: BsModalRef;

  // Propriedades para o filtro (segue o padrão do projeto)
  public ticketsFiltrados: Ticket[] = [];
  public _filtroLista = "";

  ngOnInit(): void {
    this.spinner.show();
    this.getMinhasEntradas();
  }

  public getMinhasEntradas(): void {
    this.ticketService.getMinhasReservas().subscribe({
      next: (tickets: Ticket[]) => {
        this.tickets = tickets;
        this.ticketsFiltrados = this.tickets;
      },
      error: (err: any) => {
        console.error(err);
        this.toastR.error('Erro ao carregar suas entradas.', 'Erro');
      },
      complete: () => this.spinner.hide()
    });
  }

  // --- Funções do Modal ---

  /**
   * Abre o Modal de Detalhes do Bilhete
   */
  public openModalDetalhes(template: TemplateRef<any>, ticket: Ticket, event: MouseEvent): void {
    event.stopPropagation(); // Impede o clique de ir para a linha (se houver)
    this.ticketSelecionado = ticket;
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  /**
   * Fecha o modal de detalhes
   */
  public fecharModal(): void {
    this.modalRef?.hide();
  }

  /**
   * Copia a chave do bilhete para a área de transferência.
   */
  public copiarChave(chaveInput: HTMLInputElement): void {
    chaveInput.select();
    chaveInput.setSelectionRange(0, 99999); // Para mobile

    try {
      document.execCommand('copy');
      this.toastR.info('Chave copiada para a área de transferência!');
    } catch (err) {
      this.toastR.warning('Não foi possível copiar a chave automaticamente.');
    }
  }

  // --- Filtro (Opcional, mas segue o padrão) ---
  
  public get filtroLista(): string { return this._filtroLista; }
  public set filtroLista(value: string) {
    this._filtroLista = value;
    // (Ajuste o filtro para procurar no código do bilhete ou ID do evento)
    this.ticketsFiltrados = this._filtroLista
      ? this.filtrarTickets(this._filtroLista)
      : this.tickets;
  }

  filtrarTickets(filtrarPor: string): Ticket[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.tickets.filter(ticket =>
      ticket.codigoTicket.toLocaleLowerCase().includes(filtrarPor) ||
      ticket.idEvento.toString().includes(filtrarPor)
    );
  }
}