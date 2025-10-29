import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // 1. Adicionar HttpHeaders
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { ChavePalestrante } from 'src/models/ChavePalestrante';

// Esta é uma suposição de como será a sua DTO de resposta da chave
export interface ChavePalestranteDTO {
  id: number;
  chaveValor: string; // Assumindo que este é o nome da propriedade da chave
  usada: boolean;
  dataCriacao: Date;
  // Adicione outras propriedades se a sua API retornar mais dados
}

@Injectable({
  providedIn: 'root'
})
export class ChaveService {
  private http = inject(HttpClient);

  // 2. Adicionar o método getAuthHeaders
  // (Assumindo que é o mesmo dos seus outros serviços)
  private getAuthHeaders(): HttpHeaders {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user?.token;
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  
  // O seu controller [HttpPost] não espera um body, mas o HttpClient
  // exige um body para POST. Enviamos um objeto vazio {}.
  public gerarChave(): Observable<ChavePalestrante> {
    
    // 3. Sintaxe do Post Corrigida:
    // O body ( {} ) é o segundo argumento.
    // O { headers: ... } é o terceiro argumento.
    return this.http.post<ChavePalestrante>(
      `${environment.baseUrl}/ChavePalestrantes`, 
      {}, // Body vazio
      { headers: this.getAuthHeaders() } // Opções (headers)
    );
  }
}

