import { Component, inject, TemplateRef, OnInit, ViewChild } from '@angular/core'; // 1. Adicionado ViewChild
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/models/Evento';
import { EventoService } from 'src/app/service/evento.service';
import { Funcao } from 'src/models/Enum/Funcao.enum';

// 2. Importar o novo serviço e modelo de Bilhete
import { TicketService } from 'src/app/service/ticket.service';
import { Ticket } from 'src/models/Ticket';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {

  // Injeções
  private eventoService = inject(EventoService);
  private modalService = inject(BsModalService);
  private toastR = inject(ToastrService);
  private ngxSpinnerService = inject(NgxSpinnerService);
  private router = inject(Router);
  private ticketService = inject(TicketService); // 3. Injetar o Serviço de Bilhete

  // Modal (Propriedades existentes)
  modalRef?: BsModalRef;
  message?: string;
  public idEventoExclusao: number | null = null;
  public temaEventoExclusao: string | null = null;

  // Propriedades da Lista (Existentes)
  isCollapsed = false;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  public _filtroLista = "";

  // Controlo de Cargo (Existente)
  public isPalestrante: boolean = false;

  // 4. NOVAS PROPRIEDADES PARA A RESERVA
  public idEventoParaReservar: number | null = null;
  public temaEventoParaReservar: string | null = null;
  public ticketGerado: Ticket | null = null;

  // 5. Referência para o template do modal do Bilhete no HTML
  @ViewChild('modalExibirTicket') modalTicketTemplate!: TemplateRef<any>;

  //
  // --- Métodos Existentes (ngOnInit, setCurrentUserRole, getEventos, filtros) ---
  //

  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.setCurrentUserRole();
    this.getEventos();
  }

  /**
   * Define se o utilizador atual é Palestrante, com base no localStorage.
   * (Lógica atualizada para comparar string "Palestrante" ou o número do enum)
   */
  public setCurrentUserRole(): void {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      const userRoleString: string = user?.funcao; // Ex: "Admin" ou "Palestrante" ou "3"

      if (!userRoleString) {
        this.isPalestrante = false;
        return;
      }

      // Compara a string literal ou o número (convertido de string)
      if (userRoleString === 'Palestrante' || +userRoleString === Funcao.Palestrante) {
         this.isPalestrante = true;
      } else {
         this.isPalestrante = false;
      }
    }
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

  public get filtroLista(): string { return this._filtroLista; }
  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this._filtroLista
      ? this.filtrarEventos(this._filtroLista)
      : this.eventos;
  }

  //
  // --- Métodos de Exclusão (Existentes) ---
  //

  openModal(template: TemplateRef<any>, event: MouseEvent, tema: string, eventoID: number) {
    event.stopPropagation();
    this.idEventoExclusao = eventoID;
    this.temaEventoExclusao = tema;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    if(this.idEventoExclusao != null) {
      this.ngxSpinnerService.show();
      this.eventoService.deleteEvento(this.idEventoExclusao).subscribe({
         next: (resultado: any) => {
           this.toastR.success(`Evento excluído com sucesso.`, 'Deletado!');
           this.getEventos(); // Recarrega a lista
         },
         error: (err: any) => {
           this.toastR.error(`Erro ao deletar Evento: ${err.message}`);
         },
         complete: () => {
          this.ngxSpinnerService.hide();
          this.modalRef?.hide();
         }
      });
    }
    // Não esconder o modal aqui, esperar pelo 'complete'
  }

  decline(): void {
    this.modalRef?.hide();
  }

  Redirecionardetalhes(id: number) {
     // Só redireciona se não for palestrante (palestrante vai para outra tela)
     if (!this.isPalestrante) {
        // (Pode adicionar uma tela de detalhe público mais tarde se quiser)
        // Por agora, não faz nada ao clicar na linha para um participante
     }
  }

  editarEvento(id: number, event: MouseEvent): void {
    event.stopPropagation();
    this.router.navigate([`eventos/detalhes/`, id]);
  }


  //
  // --- 6. NOVOS MÉTODOS PARA O FLUXO DE RESERVA ---
  //

  /**
   * Abre o Modal 1 (Confirmação de Reserva)
   * (Chamado pelo botão 'Reservar Vaga' no HTML)
   */
  public openConfirmarReserva(template: TemplateRef<any>, id: number, tema: string, event: MouseEvent): void {
    event.stopPropagation(); // Impede o clique de ir para a linha (Redirecionardetalhes)
    this.idEventoParaReservar = id;
    this.temaEventoParaReservar = tema;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  /**
   * Chamado pelo botão "Sim, reservar" do Modal 1.
   * Fecha o Modal 1, chama a API, e em caso de sucesso, abre o Modal 2.
   */
  public confirmarReserva(): void {
    if (!this.idEventoParaReservar) return;

    this.modalRef?.hide(); // Fecha o modal de confirmação
    this.ngxSpinnerService.show();

    this.ticketService.postTicket(this.idEventoParaReservar).subscribe({
      next: (ticket: Ticket) => {
        this.ticketGerado = ticket; // Guarda o bilhete para o Modal 2
        this.toastR.success('Vaga reservada com sucesso!');

        // Abre o Modal 2 (Exibir Bilhete)
        // Usamos o @ViewChild para obter a referência do template
        this.modalRef = this.modalService.show(this.modalTicketTemplate, {
          class: 'modal-md'
        });
      },
      error: (err: any) => {
        console.error("Erro ao criar bilhete", err);
        // Verifica se a API mandou uma mensagem de erro específica
        const erroMsg = err.error?.message || err.error || err.message || 'Erro desconhecido ao reservar vaga.';
        this.toastR.error(erroMsg, 'Falha na Reserva');
      },
      complete: () => {
        this.ngxSpinnerService.hide();
        // Limpa os IDs para a próxima reserva
        this.idEventoParaReservar = null;
        this.temaEventoParaReservar = null;
      }
    });
  }

  /**
   * Chamado pelo botão "Cancelar" do Modal 1.
   */
  public declineReserva(): void {
    this.modalRef?.hide();
    this.idEventoParaReservar = null;
    this.temaEventoParaReservar = null;
  }

  /**
   * Chamado pelo botão "Fechar" do Modal 2 (Exibir Bilhete).
   */
  public fecharModalTicket(): void {
    this.modalRef?.hide();
    this.ticketGerado = null; // Limpa o bilhete
  }

  /**
   * Copia a chave do bilhete para a área de transferência.
   */
  public copiarChave(chaveInput: HTMLInputElement): void {
    chaveInput.select();
    chaveInput.setSelectionRange(0, 99999); // Para mobile

    try {
      // Usamos document.execCommand('copy') por ser mais fiável em iframes
      document.execCommand('copy');
      this.toastR.info('Chave copiada para a área de transferência!');
    } catch (err) {
      this.toastR.warning('Não foi possível copiar a chave automaticamente.');
    }
  }
}