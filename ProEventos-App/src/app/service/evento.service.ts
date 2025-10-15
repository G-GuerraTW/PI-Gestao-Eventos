import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from 'src/models/Evento';

@Injectable(
  //{providedIn: 'root'}
)
export class EventoService {
  
  baseURL = 'http://localhost:5241/api/Evento/';
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private http: HttpClient) { }

  postEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.baseURL, evento)
  }

  getEvento(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseURL)
  }

  getEventoByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseURL}/tema/${tema}`)
  }

  getEventoById(id: string): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseURL}${id}`)
  }

  updateEvento(id: string, evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.baseURL}${id}`, evento);
  }

  deleteEvento(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}${id}`, { responseType: 'text'});
  }
}
