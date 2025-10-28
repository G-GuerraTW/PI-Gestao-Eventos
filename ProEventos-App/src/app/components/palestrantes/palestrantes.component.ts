import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-palestrantes',
  templateUrl: './palestrantes.component.html',
  styleUrls: ['./palestrantes.component.scss']
})
export class PalestrantesComponent implements OnInit {
  public palestrantes: any = [];
  public palestrantesFiltrados: any = [];
  public _filtroLista = '';

  constructor() { }

  ngOnInit() {
    this.palestrantes = [
      {
        id: 1,
        nome: 'Eliel Silva',
        miniCurriculo: 'Desenvolvedor Full Stack',
        imagemURL: 'img1.png',
        telefone: '123456789',
        email: 'eliel@example.com',
        redesSociais: [
          {
            nome: 'LinkedIn',
            url: 'https://www.linkedin.com/in/eliel-silva-1a2b3c4d/'
          }
        ],
        eventos: [
          {
            id: 1,
            tema: 'Angular'
          }
        ]
      },
      {
        id: 2,
        nome: 'João da Silva',
        miniCurriculo: 'Desenvolvedor Back End',
        imagemURL: 'img2.png',
        telefone: '987654321',
        email: 'joao@example.com',
        redesSociais: [],
        eventos: []
      }
    ];
    this.palestrantesFiltrados = this.palestrantes;
  }

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.palestrantesFiltrados = this._filtroLista
      ? this.filtrarPalestrantes(this._filtroLista)
      : this.palestrantes;
  }

  filtrarPalestrantes(filtrarPor: string): any[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();

    return this.palestrantes.filter((palestrante: { nome: string; miniCurriculo: string; }) =>
      palestrante.nome.toLocaleLowerCase().includes(filtrarPor) ||
      palestrante.miniCurriculo.toLocaleLowerCase().includes(filtrarPor)
    );
  }
}
