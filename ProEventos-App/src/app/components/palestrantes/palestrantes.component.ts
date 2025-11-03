import { Component, OnInit, inject } from '@angular/core';
import { Palestrante } from 'src/models/Palestrante';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-palestrantes',
  templateUrl: './palestrantes.component.html',
  styleUrls: ['./palestrantes.component.scss']
})
export class PalestrantesComponent implements OnInit {
  public palestrantes: Palestrante[] = [];
  public palestrantesFiltrados: Palestrante[] = [];
  public _filtroLista = '';

  private userService = inject(UserService);

  ngOnInit() {
    this.getPalestrantes();
  }

  public getPalestrantes(): void {
    this.userService.getPalestrantes().subscribe(
      (palestrantes: Palestrante[]) => {
        this.palestrantes = palestrantes;
        this.palestrantesFiltrados = this.palestrantes;
      },
      (error: any) => {
        console.error(error);
      }
    );
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

  filtrarPalestrantes(filtrarPor: string): Palestrante[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();

    return this.palestrantes.filter((palestrante) =>
      palestrante.primeiroNome.toLocaleLowerCase().includes(filtrarPor) ||
      palestrante.ultimoNome.toLocaleLowerCase().includes(filtrarPor) ||
      (palestrante.descricao && palestrante.descricao.toLocaleLowerCase().includes(filtrarPor))
    );
  }
}