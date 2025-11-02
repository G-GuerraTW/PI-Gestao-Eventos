import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { Ticket } from 'src/models/Ticket'; // Importar a nova interface

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private http = inject(HttpClient);
  // Assumindo que o seu endpoint da API para tickets é '/api/Ticket'
  private baseURL = `${environment.baseUrl}/Ticket`; 

  // Copiado de outros serviços para garantir a autenticação
  private getAuthHeaders(): HttpHeaders {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user?.token;
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Cria um novo bilhete para um evento.
   */
  public postTicket(idEvento: number): Observable<Ticket> {

    // Payload (DTO "falso") para passar na validação [Required] da API
    const payload: Partial<Ticket> = {
      idEvento: idEvento,
      codigoTicket: '',
      // O seu backend usa 'bool', por isso enviamos 'false'
      statusTicket: false 
    };

    return this.http.post<Ticket>(
      this.baseURL,
      payload,
      { headers: this.getAuthHeaders() }
    );
  }

  /**
   * Busca todos os bilhetes (reservas) do utilizador logado.
   * Chama o endpoint [HttpGet("minhas-reservas")]
   */
  public getMinhasReservas(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(
      `${this.baseURL}/minhas-reservas`,
      { headers: this.getAuthHeaders() }
    );
  }

  // ----------------------------------------------------------------
  // **** NOVOS MÉTODOS ADICIONADOS PARA A "VALIDAR ENTRADA" ****
  // ----------------------------------------------------------------

  /**
   * **** NOVO MÉTODO 1 ****
   * Busca os detalhes de um bilhete pelo seu código (string).
   * Chama o endpoint [HttpGet("codigo/{codigo}")]
   */
  public getTicketByCodigo(codigo: string): Observable<Ticket> {
    return this.http.get<Ticket>(
      `${this.baseURL}/codigo/${codigo}`,
      { headers: this.getAuthHeaders() }
    );
  }

  /**
   * **** NOVO MÉTODO 2 ****
   * Envia um pedido para marcar o bilhete como "utilizado".
   * Chama o endpoint [HttpPatch("usar/{ticketId}")]
   */
  public usarTicket(ticketId: number): Observable<Ticket> {
    // Usamos PATCH para uma atualização parcial (mudar o status)
    // O backend não espera body, mas o HttpClient envia {}
    return this.http.patch<Ticket>(
      `${this.baseURL}/usar/${ticketId}`,
      {}, // Body vazio
      { headers: this.getAuthHeaders() }
    );
  }
}