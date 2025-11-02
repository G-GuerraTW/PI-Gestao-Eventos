import { Component, inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TicketService } from 'src/app/service/ticket.service';
import { Ticket } from 'src/models/Ticket';

@Component({
  selector: 'app-validar-entrada',
  templateUrl: './validar-entrada.component.html',
  styleUrls: ['./validar-entrada.component.scss']
})
export class ValidarEntradaComponent {
  private ticketService = inject(TicketService);
  private spinner = inject(NgxSpinnerService);
  private toastR = inject(ToastrService);

  public codigoBusca: string = "";
  public ticketEncontrado: Ticket | null = null;
  public isLoading = false;

  /**
   * Chamado pelo formulário de busca
   */
  public buscarTicket(): void {
    if (this.codigoBusca.trim() === '') {
      this.toastR.warning('Por favor, insira um código.');
      return;
    }

    this.isLoading = true;
    this.ticketEncontrado = null;
    this.spinner.show();

    this.ticketService.getTicketByCodigo(this.codigoBusca).subscribe({
      next: (ticket: Ticket) => {
        this.ticketEncontrado = ticket;
        this.toastR.success('Bilhete encontrado!', 'Sucesso');
        this.isLoading = false;
        this.spinner.hide();
      },
      error: (err: any) => {
        // Se a API retornar 204 (NoContent) ou 404, o 'err.status' será 204 ou 404
        if (err.status === 204 || err.status === 404) {
          this.toastR.error('Nenhum bilhete encontrado com este código.', 'Inválido');
        } else {
          console.error('Erro ao buscar bilhete', err);
          this.toastR.error('Erro ao buscar bilhete.', 'Erro');
        }
        this.isLoading = false;
        this.spinner.hide();
      }
    });
  }

  /**
   * Chamado pelo botão "Marcar como Utilizado"
   */
  public usarTicket(): void {
    if (!this.ticketEncontrado) return;

    this.isLoading = true;
    this.spinner.show();

    this.ticketService.usarTicket(this.ticketEncontrado.id).subscribe({
      next: (ticketAtualizado: Ticket) => {
        this.ticketEncontrado = ticketAtualizado; // Atualiza o status na tela
        this.toastR.success('Entrada Registada!', 'Sucesso');
        this.isLoading = false;
        this.spinner.hide();
        // (Poderíamos limpar automaticamente após 3 segundos)
        setTimeout(() => {
          this.limparBusca();
        }, 3000); // Limpa para o próximo
      },
      error: (err: any) => {
        // A API retorna erro se o bilhete já foi usado
        const erroMsg = err.error?.message || err.error || err.message || 'Erro desconhecido ao usar bilhete.';
        this.toastR.error(erroMsg, 'Erro');
        this.isLoading = false;
        this.spinner.hide();
      }
    });
  }

  /**
   * Reseta o formulário para o próximo da fila
   */
  public limparBusca(): void {
    this.codigoBusca = "";
    this.ticketEncontrado = null;
    this.isLoading = false;
  }
}