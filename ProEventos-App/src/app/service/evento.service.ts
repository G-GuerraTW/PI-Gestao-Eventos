import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { Evento } from 'src/models/Evento';

@Injectable(
  { providedIn: 'root' }
)
export class EventoService {

  baseURL = `${environment.baseUrl}/Evento`;

  constructor(private http: HttpClient) {  }

  // Função helper que você já tem
  private getAuthHeaders(): HttpHeaders {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user?.token;
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  postEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.baseURL, evento, { headers: this.getAuthHeaders() })
  }

  // Retorna TODOS os eventos (para participantes)
  getEvento(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseURL}/Todos`, { headers: this.getAuthHeaders() });
  }

  getEventoByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseURL}/tema/${tema}`, { headers: this.getAuthHeaders() });
  }

  // Retorna UM evento (para a tela de detalhes)
  // CORRIGI AQUI: Faltava a barra "/" antes do ID
  getEventoById(id: string): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseURL}/${id}`, { headers: this.getAuthHeaders() });
  }

  // ---- NOVO MÉTODO QUE FALTAVA ----
  // Retorna a LISTA de eventos do palestrante logado
  getEventosByPalestrante(): Observable<Evento[]> {
    // Você precisa ter este endpoint no seu backend
    // Ex: [HttpGet("palestrante")]
    return this.http.get<Evento[]>(`${this.baseURL}/palestrante`, { headers: this.getAuthHeaders() });
  }
  // ---- FIM DO NOVO MÉTODO ----

  updateEvento(id: string, evento: Evento): Observable<Evento> {
    // CORRIGI AQUI: Faltava a barra "/" antes do ID
    return this.http.put<Evento>(`${this.baseURL}/${id}`, evento, { headers: this.getAuthHeaders() });
  }

  deleteEvento(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`, { responseType: 'text', headers: this.getAuthHeaders() });
  }
}
