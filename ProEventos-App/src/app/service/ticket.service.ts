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
   * Cria um novo ticket para um evento.
   * O backend [Authorize] irá extrair o idUsuario do token.
   * @param idEvento O ID do evento para o qual o ticket está a ser gerado.
   */
  public postTicket(idEvento: number): Observable<Ticket> {
    // O payload que a API espera. Ajuste se for diferente.
    // Assumindo que a API espera um objeto com o id do evento.
    const payload = { idEvento: idEvento }; 
    
    return this.http.post<Ticket>(
      this.baseURL, 
      payload, 
      { headers: this.getAuthHeaders() }
    );
  }

  // (Aqui ficará o futuro método getMinhasReservas())
}
