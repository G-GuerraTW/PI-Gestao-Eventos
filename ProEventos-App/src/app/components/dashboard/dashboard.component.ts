import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventoDTO } from 'src/app/models/EventoDTO';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  eventos: EventoDTO[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarEventos();
  }

  carregarEventos() {
    this.http.get<EventoDTO[]>('http://localhost:5241/api/Eventos')
      .subscribe((res) => this.eventos = res);
  }

  editarEvento(evento: EventoDTO) {
    this.http.put(`http://localhost:5241/api/Eventos/${evento.id}`, evento)
      .subscribe(() => alert('Evento atualizado com sucesso!'));
  }

  excluirEvento(id: number) {
    this.http.delete(`http://localhost:5241/api/Eventos/${id}`)
      .subscribe(() => {
        this.eventos = this.eventos.filter(e => e.id !== id);
        alert('Evento excluído com sucesso!');
      });
  }
}
