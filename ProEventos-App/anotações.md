
# Guia de Iniciação Angular - ProEventos-App

## 🧰 1. Instalação de Dependências Iniciais

### 🔹 Instalar Angular CLI (requer Node.js e NPM)
```bash
npm install -g @angular/cli
```

---

## 🧩 2. Extensões Recomendadas para o VSCode

- Angular Essentials  
- Angular Files  
- Auto Close Tag  
- Auto Rename Tag  
- Bracket Pair Colorizer 2  
- Color Highlight  
- Path Intellisense  
- TSLint  

---

## 🚀 3. Criação e Configuração Inicial do Projeto Angular

### 🔹 Criar novo projeto
```bash
ng new ProEventos-App
```

### 🔹 Opções de configuração recomendadas
- Helps improve maintainability? → **Yes**  
- Add Angular routing? → **Yes**  
- Style format? → **SCSS**

---

## 🧭 4. Estrutura e Configuração do Projeto

### 🔹 Verificação do `package.json`
Sempre verifique os scripts e dependências no `package.json`.

### 🔹 Importante: `angular.json`
Contém configurações globais do projeto, como:
```json
"index": "src/index.html",
"main": "src/main.ts"
```

---

## 🏗️ 5. Criação de Componentes

```bash
ng g c proeventos
ng g c palestrantes
```

### 🔹 Modificar `app.component.html` para incluir os componentes
```html
<app-eventos></app-eventos>
<app-palestrantes></app-palestrantes>
<router-outlet></router-outlet>
```

---

## 🔄 6. Diretiva *ngFor e Interpolação

### 🔹 Exemplo de objeto e função no `eventos.component.ts`
```ts
export class EventosComponent {
  public eventos: any = [];

  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): void {
    this.eventos = [
      { Tema: "Angular", Local: "Belo Horizonte" },
      { Tema: "Dotnet", Local: "São Paulo" },
      { Tema: "Entity", Local: "Barra Bonita" }
    ];
  }
}
```

### 🔹 Exemplo de interpolação no HTML
```html
<div *ngFor="let evento of eventos">
  <p>Tema: {{ evento.Tema }}</p>
  <p>Local: {{ evento.Local }}</p>
  <hr>
</div>
```

---

## 🌐 7. Integração com API via HttpClient

### 🔹 Importar `HttpClientModule` no `app.module.ts`
```ts
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  ...
})
export class AppModule { }
```

### 🔹 Atualizar `eventos.component.ts` para usar a API
```ts
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent {
  public eventos: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEventos();  
  }

  public getEventos(): void {
    this.http.get('http://localhost:5241/api/Evento/').subscribe(
      response => this.eventos = response,
      error => console.log(error),
    );
  }
}
```

---

## 🎨 8. Instalação de FontAwesome e NGX-Bootstrap

### 🔹 FontAwesome
```bash
npm install --save @fortawesome/fontawesome-free
```

### 🔹 NGX Bootstrap
```bash
ng add ngx-bootstrap
```

### 🔹 Atualizar `styles.scss`
```scss
@import "./node_modules/bootstrap/scss/bootstrap";
@import "node_modules/ngx-bootstrap/datepicker/bs-datepicker";
@import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
```

### 🔹 Importar `BrowserAnimationsModule` no `app.module.ts`
```ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ...
  ]
})
```

---

## 🧪 9. Teste de Layout e Componentes

### 🔹 Atualizar `app.component.html` para usar `container`
```html
<div class="container text-center">
  <app-eventos></app-eventos>
  <app-palestrantes></app-palestrantes>
  <router-outlet></router-outlet>
</div>
```

## 10. Interpolação e Diretivas
### iniciando, iremos adicionar uma barra de navegação em nosso projeto, selecionando o component de navbar la dentro da documentação do Bootstrap, link da documentação utilizada no exemplo: **https://getbootstrap.com/docs/5.2/components/navbar/#nav**, logo apos copiamos o codigo html da nav, e criaremos um novo componente chamado de nav, e após criar este componente iremos ao a documentação do bootstrap e pegar o componente nav deles para poder usar, ficando assim o component, **nav.component.html**:

```html
<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">ProEventos</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Eventos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Palestrantes</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Contatos</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```
### lembrando que para funcionar a ferramenta de colapse no navbar é necessario adicionar o import do collapse no app module, para ter toda a informação de como tem que ficar temos exemplos na aba API neste link: **https://valor-software.com/ngx-bootstrap/components/collapse?tab=api**, lembrando que sempre que utilizar algum componente do ngx bootstrap possivelmente sera necessario utilizar algum modulo aparte, importando ele... exemplo de como ficaria o app.module.ts: 
```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';


@NgModule({
  declarations: [
    AppComponent,
    EventosComponent,
    PalestrantesComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### após adicionarmos o modulo, é necessario referenciar a função do colapse dentro do componente alvo, sendo o .html \ .ts, adicionando a parte do html no elemento no qual desejamos colapsar, como no exemplo abaixo do arquivo **nav.component.html**: 
```html
<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">ProEventos</a>
    <button class="navbar-toggler" type="button"  (click)="isCollapsed = !isCollapsed" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> <!--Exemplo do botão que trocara o status do colapse -->
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav" [collapse]="isCollapsed" [isAnimated]="true"> <!--Exemplo da div que sera colapsada -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Eventos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Palestrantes</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Contatos</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```
### e adicionamos no arquivo **nav.component.ts**  criaremos a propriedade de status, para indicar se o elemento esta colapsado ou não, para isso criaremos a propriedade chamada: IsCollapsed, ficando assim nosso **nav.component.ts**:
```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
 isCollapsed = false; // <------- este é a propriedade que o Html
}
```
### Adicionando os registro de eventos em tabelas, neste momento iremos pegar os registros de evento e iremos tratalos em tabela, para isso vamos reajustar o app.component.html ficando desta forma:
```html
<app-nav></app-nav>

<div class="container">
<app-eventos></app-eventos>

<router-outlet></router-outlet>
</div>
```

### e nisso iremos agora adicionar filtro de busca e a tabela ao **eventos.component.html**, como iremos customizar utilizando classes do bootsrap lembrar sempre de verificar no arquivo **angular.json** sempre qual a versão que está sendo utilizada tanto do bootsrap, ngx-bootstrap e também do fort-awesome caso utilizado.:
```html
<h3>Eventos</h3>
<hr>

<form action="" class="form-inline">
    <div class="form-group mb-2">
        <input type="text" class="form-control mr-2" placeholder=buscar>
        <button class="btn btn-outline-sucess">Buscar</button>
    </div>
</form>
<table class="table table-dark"> <--! aqui segue exemoplo da classe 
    <thead> 
        <tr>
            <th>#</th>
            <th>Image</th>
            <th>Local</th>
            <th>Data</th>
            <th>Qtd Pessoas</th>
            <th>Lote</th>
            <th>Opções</th>
        </tr>
    </thead>
    <tbody class="table-striped">
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>
```
### após a interpolação e biddings o nosso arquivos **eventos.component.html** irá ficar assim, lembrando que neste código foi adicionado classes, tanto do fontawesome, bootstrap e ngx-bootstrap também foi adicionado colapse na coluna imagem, e adicionado icones na coluna opções utilizando o font-awesome, entao foi trabalhado varios aspectos nesta etapa, e finalmente adicionado a interpolação com bidings.: 

### neste trecho de código nao irei comentar a fundo todos as classes e suas funções mais caso duvida quando eu consultar futuramente é apenas dar uma procurada no site da documentação com a informação que eu estiver precisando no momento.
```html
<h3>Eventos</h3>
<hr>

<form action="" class="form-inline container mb-2">
    <div class="form-group mb-2 row">
        <input type="text" class="form-control col" placeholder=buscar>
        <button class="btn btn-outline-success col-3 ms-3">Buscar</button>
    </div>
</form>
<table class="table table-dark">
    <thead class="text-center"> 
        <tr>
            <th>#</th>
            <th><i style="cursor: pointer;" (click)="isCollapsed = !isCollapsed">Image</i></th>
            <th>Local</th>
            <th>Data</th>
            <th>Qtd Pessoas</th>
            <th>Lote</th>
            <th>Opções</th>
        </tr>
    </thead>
    <tbody class="table-striped">
        <tr *ngFor="let evento of eventos" class="text-center">
            <td>{{evento.id}}</td>
            <td>
                <img src="../../assets/img/{{evento.imagemURL}}" alt="" [collapse ="isCollapsed" [isAnimated]="true" style="width: 80px;">
            </td>
            <td>{{evento.local}}</td>
            <td>{{evento.dataEvento}}</td>
            <td>{{evento.qtdPessoas}}</td>
            <td>{{evento.lotes ? evento.lotes : 0}}</td>
            <td>
                <i class="fa-solid fa-pen-to-square ms-2 fa-xl icon-hover"></i>
                <i class="fa-regular fa-circle-xmark ms-2 fa-xl icon-hover"></i>
                <i class="fa-solid fa-user ms-2 fa-xl icon-hover"></i>
            </td>
        </tr>
    </tbody>
    <tfoot *ngIf="eventos && eventos.length === 0">
            <tr class="table table-danger">
                <td  colspan="8" class="text-center"> 
                    <h3>Nenhum Evento Encontrado</h3>
                </td>
            </tr>
    </tfoot>
</table>
{{eventos | json }} <--! exemplo pratico de como exibir o json que está vindo no bind>
```
### agora iremos começar a trabalhar no input de pesquisa da barra, utilizando um metodo two way data bind, para utilizar o two way databind precisaremos importar o **formsModule** em nosso componente, adicionando o seguinte import no **app.module.ts**:
```js
import { FormsModule } from '@angular/forms';

//no import

imports: [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  BrowserAnimationsModule,
  CollapseModule,
  FormsModule
]
```
```js
✅ Interpolação ({{ }})
✅ Property Binding ([property]="valor")
✅ Diretivas estruturais (*ngIf, *ngFor)
✅ Two-way Data Binding ([(ngModel)])

//Exemplos de tipos utilizado no angular.
```

### prosseguindo com a funcionalidade do filtro sobre nossa tabela, seguimos com as modificações no **evento.component.html**:
```HTML
<h3>Eventos</h3>
<hr>

<div action="" class="form-inline container mb-2">
    <div class="form-group mb-2 row">
        <input 
            type="text" class="form-control col" placeholder=buscar
            [(ngModel)]="filtroLista"
        >
    </div>
</div>
<table class="table table-dark">
    <thead class="text-center"> 
        <tr>
            <th>#</th>
            <th><i style="cursor: pointer;" (click)="isCollapsed = !isCollapsed">Image</i></th>
            <th>Local</th>
            <th>Data</th>
            <th>Qtd Pessoas</th>
            <th>Lote</th>
            <th>Opções</th>
        </tr>
    </thead>
    <tbody class="table-striped">
        <tr *ngFor="let evento of eventosFiltrados" class="text-center">
            <td>{{evento.id}}</td>
            <td>
                <img src="../../assets/img/{{evento.imagemURL}}" alt="" [collapse]="isCollapsed" [isAnimated]="true" style="width: 80px;">
            </td>
            <td>{{evento.local}}</td>
            <td>{{evento.dataEvento}}</td>
            <td>{{evento.qtdPessoas}}</td>
            <td>{{evento.lotes ? evento.lotes : 0}}</td>
            <td>
                <i class="fa-solid fa-pen-to-square ms-2 fa-xl icon-hover"></i>
                <i class="fa-regular fa-circle-xmark ms-2 fa-xl icon-hover"></i>
            </td>
        </tr>
    </tbody>
    <tfoot *ngIf="eventos && eventosFiltrados.length === 0">
            <tr class="table table-danger">
                <td  colspan="8" class="text-center"> 
                    <h3>Nenhum Evento Encontrado</h3>
                </td>
            </tr>
    </tfoot>
</table>
```
### e com as seguintes alterações no **evento.component.ts**: 
```javascript
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { __values } from 'tslib';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent {

  //Estilos
  isCollapsed = false;
  public eventos: any = [];
  public eventosFiltrados: any = [];

  //Filtro Lista de eventos
  private _filtroLista = "";

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this._filtroLista
      ? this.filtrarEventos(this._filtroLista)
      : this.eventos;
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase().trim();

    if (!filtrarPor) {
      return this.eventos; // Retorna todos se o filtro estiver vazio
    }

    return this.eventos.filter(
      (evento: { tema: string; local: string }) =>
        evento.tema.toLocaleLowerCase().includes(filtrarPor) ||
        evento.local.toLocaleLowerCase().includes(filtrarPor)
    );
  }
//-------------------------------------------------------------------

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): void {
    this.http.get('http://localhost:5241/api/Evento/').subscribe(
      (response: any) => {
        this.eventos = response;
        this.eventosFiltrados = this.eventos; // Inicializa com todos os eventos
      },
      error => console.log(error)
    );
  }
}
```
## Lembrando que os diretórios, models, services, util, helpers devem estár dentro do diretório: **app**

## Interface Model

### iniciaremos criando um novo diretorio chamado **models** em nosso diretorio raiz do angular, e iremos mapear as entidades no qual temos criada la no backend, Iremos Criar **Interfaces** desta vez !, não tendo necessidade de criar **Todas** entidades de relacionamento, apenas algumas, isso depende do modelo que iremos utilizar, lembrando também que o modelo tem que respeitar como vem no json, ou seja, se id foi minusculo no json, aqui no modelo no angular também devera ser id em minusculo e respeitar.

#### **Evento.ts**
```Javascript
import { Lote } from "./Lote";
import { Palestrante } from "./Palestrante";
import { RedeSocial } from "./RedeSocial";

export interface Evento 
{
    //Propriedades da entidade
    id: number;
    local: string;
    tema: string;
    dataEvento?: Date;
    qtdPessoas: number;
    imagemURL: string;
    telefone: string;
    email: string;

    //Propriedades Relacionais
    lotes: Lote[];
    redeSociais: RedeSocial[];
    eventosPalestrantes: Palestrante[];

    //Propriedades do Usuario
    useId: number;
}
```

#### **Lote.ts**
```Javascript
import { Evento } from "./Evento"

export interface Lote {
    id: number;
    nome: string;
    dataInicio?: Date;
    dataFim?: Date;
    valor: number;
    quantidade: number;
    eventoId: number;
    evento: Evento;
}
```

#### **Palestrante.ts**
```Javascript
import { Evento } from "./Evento";
import { RedeSocial } from "./RedeSocial"
import { User } from "./User"

export interface Palestrante {
    id: number;
    nome: string;
    miniCurriculo: string;
    userId: number;
    user: User;
    redeSocial: RedeSocial[];
    eventoPalestrante: Evento[];
}
```

#### **RedeSocial.ts**
```Javascript
export interface RedeSocial {
    id: number;
    nome: string;
    uRL: string;
    eventoId: number;
    palestranteId?: number;
}
```

## Gerando Service

#### nesta etapa iremos gerar o service no qual irá abrigar nossas chamadas da api, neste momento criaremos o diretorio chamado **services** no qual estara abrigando todos nossas chamadas, para que cada componente possa acessar ela livremente, inicando primeiramente removendo a injeção do HttpCliente de nosso componente evento, e adicionaremos

```console
ng g s service/user
```

#### uma informação sobre injeção de serviço no angular, é possivel ser realizada de 3 maneiras, a primeira sendo o mesmo **Injectable** pelo proprio serviço, a segunda é utilizando via providers e injetando via @component, e a terceira maneira é utilizando do **app.module.ts** na proprievade providers, caso voce adicionar algum serviço ou component la, ele estára disponivel para todos as declaração de seu projeto. e neste projeto iremos utilziar a injeção de serviços via **app.module** segue abaixo os arquivos configurados:

#### **evento.service.ts**
```javascript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable(
  //{providedIn: 'root'}
)
export class EventoService {
  
  baseURL = 'http://localhost:5241/api/Evento/';
  constructor(private http: HttpClient) { }

  getEvento() {
    return this.http.get(this.baseURL)
  }

}
```

#### adicionando a injeção em nosso **app.module.ts**:
```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule } from '@angular/forms';
import { EventoService } from 'src/service/evento.service';


@NgModule({
  declarations: [
    AppComponent,
    EventosComponent,
    PalestrantesComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule,
    FormsModule
  ],
  providers: [EventoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### e o componente do evento atualizado, **evento.component.ts**:
```javascript
import { Component } from '@angular/core';
import { EventoService } from 'src/service/evento.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  // providers: [EventoService] <-- exemplo de mais uma maneira de como injetar o serviço no component.
})
export class EventosComponent {

  //Estilos
  isCollapsed = false;
  public eventos: any = [];
  public eventosFiltrados: any = [];

  //Filtro Lista de eventos
  private _filtroLista = "";

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this._filtroLista
      ? this.filtrarEventos(this._filtroLista)
      : this.eventos;
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase().trim();

    if (!filtrarPor) {
      return this.eventos; // Retorna todos se o filtro estiver vazio
    }

    return this.eventos.filter(
      (evento: { tema: string; local: string }) =>
        evento.tema.toLocaleLowerCase().includes(filtrarPor) ||
        evento.local.toLocaleLowerCase().includes(filtrarPor)
    );
  }
//-------------------------------------------------------------------

  constructor(private eventoService: EventoService) { }
  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): void {
    this.eventoService.getEvento().subscribe(
      (response: any) => {
        this.eventos = response;
        this.eventosFiltrados = this.eventos; // Inicializa com todos os eventos
      },
      error => console.log(error)
    );
  }
}
```

### Tipagem dos retornos do serviço, 
#### agora iremos tipar o retorno de nossos metodos que faz consultas http em modelos ja existente, por exemplo **EventoService.ts**
```JS
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

  getEvento(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseURL)
  }

  getEventoByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseURL}/tema/${tema}`)
  }

  getEventoById(id: string): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseURL}${id}`)
  }
}
```

#### Exemplo utilizando modelo tipado e a utilização do seviço em nosso componente **evento.component.ts**:
```javascript
import { Component } from '@angular/core';
import { Evento } from 'src/models/Evento';
import { EventoService } from 'src/service/evento.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  // providers: [EventoService] <-- exemplo de mais uma maneira de como injetar o serviço no component.
})
export class EventosComponent {

  //Estilos
  isCollapsed = false;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];

  //Filtro Lista de eventos
  public _filtroLista = "";

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this._filtroLista
      ? this.filtrarEventos(this._filtroLista)
      : this.eventos;
  }

filtrarEventos(filtrarPor: string): Evento[] {
  filtrarPor = filtrarPor.toLocaleLowerCase();

  if (!filtrarPor) {
    return this.eventos; // Retorna todos se o filtro estiver vazio
  }

  return this.eventos.filter(evento =>
    evento.tema.toLocaleLowerCase().includes(filtrarPor)||
    evento.local.toLocaleLowerCase().includes(filtrarPor)
  );
}

//-------------------------------------------------------------------

  constructor(private eventoService: EventoService) { }
  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): void {
    this.eventoService.getEvento().subscribe(
      (_eventos: Evento[]) => {
        console.log('Eventos recebidos:', _eventos);
        this.eventos = _eventos;
        this.eventosFiltrados = this.eventos; // Inicializa com todos os eventos
      },
      error => console.log(error)
    );
  }
}
```

### Utilizando o lint em nossa aplicação, utilizaremos ESLint para fazer a correção e padronização da nossa aplicação, para isso seguiremos com os seguintes comandos para instalação:

#### 1- ng add @angular-eslint/schematics   <--- comando para adicionar o lint na aplicação angular
#### 2 - ng lint     <----- comando para validar se existe algum problema de lint na aplicação.

#### após a instalação e correção de nossos componentes, models e serviço com o ESLint ficara assim:

#### **eventos.componnet.ts**
```javascript
import { Component, inject, OnInit } from '@angular/core';
import { Evento } from 'src/models/Evento';
import { EventoService } from 'src/service/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  // providers: [EventoService] <-- exemplo de mais uma maneira de como injetar o serviço no component.
})
export class EventosComponent implements OnInit {

  private eventoService = inject(EventoService);

  //Estilos
  isCollapsed = false;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];

  //Filtro Lista de eventos
  public _filtroLista = "";

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this._filtroLista
      ? this.filtrarEventos(this._filtroLista)
      : this.eventos;
  }

filtrarEventos(filtrarPor: string): Evento[] {
  filtrarPor = filtrarPor.toLocaleLowerCase();

  if (!filtrarPor) {
    return this.eventos; // Retorna todos se o filtro estiver vazio
  }

  return this.eventos.filter(evento =>
    evento.tema.toLocaleLowerCase().includes(filtrarPor)||
    evento.local.toLocaleLowerCase().includes(filtrarPor)
  );
}

//-------------------------------------------------------------------

  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): void {
    const observer = {
      next: (_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.eventosFiltrados = this.eventos; // Inicializa com todos os eventos
       },
      error: (error: unknown) => {console.log(error)}
    }
    this.eventoService.getEvento().subscribe(observer);
  }
}

```

#### **eventos.component.html**
```html
<h3>Eventos</h3>
<hr>

<div action="" class="form-inline container mb-2">
    <div class="form-group mb-2 row">
        <input 
            type="text" class="form-control col" placeholder=Buscar
            [(ngModel)]="filtroLista"
        >
    </div>
</div>
<table class="table table-dark">
    <thead class="text-center"> 
        <tr>
            <th>#</th>
            <th>
              <button
                class="btn btn-link p-0 m-0"
                (click)="isCollapsed = !isCollapsed"
                aria-label="Alternar exibição de imagem"
              >
                Image
              </button>
            </th>
            <th>Local</th>
            <th>Data</th>
            <th>Qtd Pessoas</th>
            <th>Lote</th>
            <th>Opções</th>
        </tr>
    </thead>
    <tbody class="table-striped">
        <tr *ngFor="let evento of eventosFiltrados" class="text-center">
            <td class="align-middle">{{evento.id}}</td>
            <td>
                <img src="../../assets/img/{{evento.imagemURL}}"  alt="" [collapse]="isCollapsed" [isAnimated]="true" style="width: 80px;">
            </td>
            <td class="align-middle">{{evento.local}}</td>
            <td class="align-middle">{{evento.dataEvento}}</td>
            <td class="align-middle">{{evento.qtdPessoas}}</td>
            <td class="align-middle">{{evento.lotes}}</td>
            <td class="align-middle">
                <i class="fa-solid fa-pen-to-square ms-2 fa-xl icon-hover"></i>
                <i class="fa-regular fa-circle-xmark ms-2 fa-xl icon-hover"></i>
            </td>
        </tr>
    </tbody>
    <tfoot *ngIf="eventos && eventosFiltrados.length === 0">
            <tr class="table table-danger">
                <td  colspan="8" class="text-center"> 
                    <h3>Nenhum Evento Encontrado</h3>
                </td>
            </tr>
    </tfoot>
</table>
```

### Configurando pipeline para formatar campos, como data por exemplo, 

#### criaremos um novo diretório chamado **helpers** e dentro dele criaremos uma nova pipe, **Generate pipe** opção com o nome de: **DateTimeFormat** e iremos alterar o arquivo **DateTimeFOrmat.pipe.ts**, ficando da seguinte forma:
```javascript
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DateTimeFormatPipe'
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return super.transform(value, 'dd/MM/yyyy hh:mm');
  }
}
```
#### Criaremos também um novo diretório com o nome de util, e gerar uma nova classe com o nome de **constants.ts** com a intenção de abrigar alguns valores contants por exemplo como formatação de data, para abrigar está classe criaremos o diretório com nome de **utils.ts**, ficando assim nossa classe constante:
```javascript
export class Constants {
    static readonly DATE_FMT = 'dd/MM/yyyy';
    static readonly DATE_TIME_FMT = `${Constants.DATE_FMT} hh:mm`;
}
```
#### e apartir deste momento utilizaremos essa contante la na nossa pipe-line da **classe DateTimeFormat.pipe.ts**: 

```javascript
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from '../utils/constants';

@Pipe({
  name: 'DateTimeFormat'
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  public override transform(value: any, args?: any): any {
    return super.transform(value, Constants.DATE_FMT);
  }
}

```
#### neste momento agora iremos importar o pipe line dentro de nosso **app.module.ts** no @NgModules, após isso poderemos ja utilizar o filtro em nosso campo html, ficando como exemoplo abaixo, no arquivo **app.component.evento.html**: 
```html
<td class="align-middle">{{evento.dataEvento | DateTimeFormatPipe}}</td>  <-- ficando destá maneira
```

#### agora iremos adicionar um component **ngx-bootstrap**, sendo Dropdown, para isso iremos adicionar o import em nosso **app.component.module** estaremos adicionando o modulo de **TooltipModule** para quando passarmos o mouse sobre um botão ter uma caixa de testo informando alguma coisa, como se fosse um pequeno balão, e também utilizaremos do dropdown que é uma lista de opções com layout personalizado. 
```JS
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Ngmodule({
  imports[
    TooltipModule,
    BsDropdownModule.forRoot();
  ]
})
```

#### ficando assim nosso navbar, **navbar.component.html**:
```html
<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">ProEventos</a>
    <button class="navbar-toggler" type="button"  (click)="isCollapsed = !isCollapsed" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav" [collapse]="isCollapsed" [isAnimated]="true">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Eventos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Palestrantes</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Contatos</a>
        </li>
      </ul>
      <ul class="navbar-nav ms-auto me-3">
          <li class="nav-item">
            <div class="btn-group" dropdown >
              <a id="button-basic" dropdownToggle type="button" class="nav-link dropdown-toggle"
                      aria-controls="dropdown-basic">
                Button dropdown <span class="caret"></span>
              </a>
              <ul id="dropdown-basic" *dropdownMenu class="dropdown-menu"
                  role="menu" aria-labelledby="button-basic">
                <li role="menuitem"><a class="dropdown-item" href="#">Action</a></li>
                <li role="menuitem"><a class="dropdown-item" href="#">Another action</a></li>
                <li role="menuitem"><a class="dropdown-item" href="#">Something else here</a></li>
                <li class="divider dropdown-divider"></li>
                <li role="menuitem"><a class="dropdown-item" href="#">Separated link</a>
                </li>
              </ul>
          </div>
          </li>
        </ul>
    </div>
  </div>
</nav>
```

#### adicionando uma modal a nossa tela de eventos, neste momento iremos adicionar a modal para deseja excluir um elemento da lista de eventos para isso adicionaremos uma modal **ngx-bootstrap** em nossa aplicação, ("Confirm Window") ficando assim nosso component.**evento.html**:
```html
<h3>Eventos</h3>
<hr>
<div action="" class="form-inline container mb-2">
    <div class="form-group mb-2 row">
        <input 
            type="text" class="form-control col" placeholder=Buscar
            [(ngModel)]="filtroLista"
        >
    </div>
</div>
<table class="table table-dark">
    <thead class="text-center"> 
        <tr>
            <th>#</th>
            <th>
              <button
                class="btn btn-link p-0 m-0"
                (click)="isCollapsed = !isCollapsed"
                aria-label="Alternar exibição de imagem"
              >
                Image
              </button>
            </th>
            <th>Local</th>
            <th>Data</th>
            <th>Qtd Pessoas</th>
            <th>Lote</th>
            <th>Opções</th>
        </tr>
    </thead>
    <tbody class="table-striped">
        <tr *ngFor="let evento of eventosFiltrados" class="text-center">
            <td class="align-middle">{{evento.id}}</td>
            <td>
                <img src="../../assets/img/{{evento.imagemURL}}"  alt="" [collapse]="isCollapsed" [isAnimated]="true" style="width: 80px;">
            </td>
            <td class="align-middle">{{evento.local}}</td>
            <td class="align-middle">{{evento.dataEvento | DateTimeFormat }}</td>
            <td class="align-middle">{{evento.qtdPessoas}}</td>
            <td class="align-middle">{{evento.lotes}}</td>
            <td class="align-middle">
                <button tooltip="Editar" type="button" class="btn btn-primary btn-sm mx-2"><i class="fa-solid fa-pen-to-square fa-xl icon-hover" ></i></button>
                <button tooltip="Excluir" type="button" class="btn btn-danger btn-sm" (click)="openModal(template)"><i class="fa-regular fa-circle-xmark fa-xl icon-hover"></i></button>
            </td>
        </tr>
    </tbody>
    <tfoot *ngIf="eventos && eventosFiltrados.length === 0">
            <tr class="table table-danger">
                <td  colspan="8" class="text-center"> 
                    <h3>Nenhum Evento Encontrado</h3>
                </td>
            </tr>
    </tfoot>
</table>
<ng-template #template>
  <div class="modal-body text-center">
    <p>Deseja Excluir Este Evento ?</p>
    <button type="button" class="btn btn-default" (click)="confirm()">Sim</button>
    <button type="button" class="btn btn-primary" (click)="decline()">Não</button>
  </div>
</ng-template>
```

#### também foi necessario importar o component do ngx-bootstrap, adicionando está linha ao **app.module.ts**,
```javascript
import { ModalModule } from 'ngx-bootstrap/modal';

imports: [
  ModalModule.forRoot()
]
```
#### lembrando que todos os imports que tiverem .forRoot() na sua instrução poderão ser injetados via **inject()** dentro do componente que irá utilizalo.

#### Introdução do **ngx-toastr**, para adicionar este recurso inicalmente iremos adicionar o package dele em nossa aplicação utilizando o comando:
```javascript
npm install ngx-toastr
```

#### logo após iremos seguir a indicação do site que iremos fazer a instalação, no caso estamos utilizando o **npmjs** como referencia de instalação, em seguida após instalarmos o package se observarmos na documentação temos o step de adicionar no **angular.json** um novo style ficando assim:
```javascript
"styles": [
  "styles.scss",
  "node_modules/ngx-toastr/toastr.css" // try adding '../' if you're using angular cli before 6
]
```

#### e em nosso módulo adicionaremos, **app.component.ts** :
```javascript
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
```

#### agora iremos adicionar o ngx-spinner
```js
npm install ngx-spinner --save --force  <-- caso der erro de incompatibilidade.
```

#### apos isso iremos adicionar no **angular.json**:
```
{
  "styles": [
    "node_modules/ngx-spinner/animations/ball-scale-multiple.css" // ===> Add css file based on your animation name(here it's "ball-scale-multiple")
    // You're able to add multiple files if you need
  ]
}
```

#### e também no **app.module.ts**, adicionando o import do package :
```js
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  imports: [
    // ...
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
```

#### exemplo de uso:
```js
import { NgxSpinnerService } from "ngx-spinner";

class AppComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }
}
```

#### como está ficando nosso component **evento.component.ts**: 
```js
import { Component, inject, OnInit, TemplateRef } from '@angular/core';

import { Evento } from 'src/models/Evento';

import { EventoService } from 'src/service/evento.service';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  // providers: [EventoService] <-- exemplo de mais uma 
})
export class EventosComponent implements OnInit {

  private eventoService = inject(EventoService);       // ✔️ injeção correta
  private modalService = inject(BsModalService);      // ✔️ injeção do serviço de modal
  private toastR = inject(ToastrService);            // ✔️ injeção do package de aviso
  private ngxSpinnerService = inject(NgxSpinnerService);

  // modal
  modalRef?: BsModalRef;
  message?: string;

  // Estilos
  isCollapsed = false;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];

  public _filtroLista = "";


  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.getEventos();
  }

  public getEventos(): void {
    const observer = {
      next: (_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.eventosFiltrados = this.eventos;
      },
      error: (error: unknown) => {
        this.ngxSpinnerService.hide();
        this.toastR.error($`Erro: ${error}`);
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

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this._filtroLista
      ? this.filtrarEventos(this._filtroLista)
      : this.eventos;
  }

  openModal(template: TemplateRef<unknown>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.toastR.success('Evento Excluido com sucesso!', "Deletado!");
    this.modalRef?.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }
}

```

#### também temos a necessidade de adicionar um **elemento** em nosso arquivo **evento.component.html** que é como se fosse uma modal que ira aparecer com efeito de loading, adicionando a seguinte linha:
```html
<ngx-spinner type="ball-scale-multiple"></ngx-spinner>
```

### agora iremos utilizar mais uma nova função para nós que é passar um parametro via tag do html, por exemplo, temos a tag **<app-titulo></app-titulo>** no qual app-titulo ela exibe o titulo atual da página que está utilizando ela mais para isso precisamos passar o "titulo" via parametro para o elemento **titulo** que estamos utilizando, para isso vamos montar a estrutura inicalmente.

#### inicialmente criaremos um novo diretório dentro de **app** e mais um novo diretório chamado **components** e também **shared**, no qual o diretório de nome components ira abrigar todos nossos componentes que nao serão utilizados em outros componentes, e componentes que serão compartilhados ficarão dentro do diretório **shared**, no momento iremos atualizar nossa navbar para compartilhar nossos novos componentes utilizando **routerLink=""** e em seguida iremos gerar estes novos componentes:

#### **nav.component.html**:
```html
<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" routerLink="dashboard">ProEventos</a>
    <button class="navbar-toggler" type="button"  (click)="isCollapsed = !isCollapsed" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav" [collapse]="isCollapsed" [isAnimated]="true">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" routerLink="eventos" routerLinkActive="active">Eventos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="palestrantes" routerLinkActive="active">Palestrantes</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="contatos" routerLinkActive="active">Contatos</a>
        </li>
      </ul>
      <ul class="navbar-nav ms-auto me-5">
          <li class="nav-item">
            <div class="btn-group" dropdown >
              <a id="button-basic" dropdownToggle type="button" class="nav-link dropdown-toggle"
                      aria-controls="dropdown-basic">
                Gabriel <span class="caret"></span>
              </a>
              <ul id="dropdown-basic" *dropdownMenu class="dropdown-menu"
                  role="menu" aria-labelledby="button-basic">
                <li role="menuitem"><a class="dropdown-item" routerLink="perfil">Perfil

                </a></li>
                <li role="menuitem"><a class="dropdown-item" routerLink="">Sair</a></li>
              </ul>
          </div>
          </li>
        </ul>
    </div>
  </div>
</nav>
```

#### agora iremos gerar os novos componentes dentro do diretório **components**, geraremos os seguintes componentes: contatos, dashboar, perfil, e dentro de todos os nossos componentes na primeira linha após a navbar iremos adicionar o seguinte elemento em nossos components criados na primeira linha:
```html
<app-titulo [titulo]="'Dashboard'"></app-titulo>
```
#### em cada componente que adicionarmos este elemento com esta função estaremos passando um valor no paremtro que no caso é o nome do componente que está chamando o component titulo, ou seja, em cada componente que tiver o uso do componente compartilhado **<app-titulo></app-titulo>**, agora ja em nosso componente **titulo.component.ts** no qual criamos dentro do diretório **shared** vamos ter a seguinte instrução:
```javascript
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent implements OnInit {
@Input() titulo: string | undefined; // <------- nestá declaração estamos avisando que esse component aguarda um parametro quando o elemento dele for chamado dentro de algum component, e para isso utilizaremos a seguinte sintaxe que foi mostrada acima no <app-titulo>

ngOnInit(): void {
}

}
```

### Rotas
#### neste momento do projeto iremos introduzir rotas em nossa aplicação, para poder utilizar de redirecionamento direto entre components, introduziremos inicialmente em nossa **nav.component.html**  no **href** de cada comonent, como no exemplo abaixo, **nav.component.html**:
```html
<a class="nav-link active" aria-current="page" href="/eventos">Eventos</a>
```
#### lembrando que o **href** está relacionado a página que sera redirecionado.

#### prosseguindo com as **rotas** agora iremos para parte mais importante que é criar o redirecionamendo em nossa aplicação para isso iremos ao component: **app-routing.module.ts** para criar as configurações de rota, e nosso arquivo ficará assim:
```javascript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';

//Aqui para baixo exemplo do path: caminho que sera chamado e component.
const routes: Routes = [
  { path: 'perfil', component: PerfilComponent},
  { path: 'eventos', component: EventosComponent},
  { path: 'contatos', component: ContatosComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'palestrantes', component: PalestrantesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

### agora iremos utilizar de sites tereiros para obter um thema free para ajudar com o nosso desenvolvimento, para isso iremos utilizar de 2 sites por exemplo de modelos sendo, bootsnipp.com e bootswatch.com, inicaremos com o bootswatch que ele é uma customização do bootstrap, ou seja ele ja customiza o tema padrão do bootstrap, e seguira da seguinte forma:

#### iniciaremos com o comando **npm install bootswatch**, utilizaremos o comando:
```javascript
npm install bootswatch
```

#### logo após adicionar o pacote via npm iremos adicionar o **@impor** no arquivo **syles.scss**:
```javascript
@import "../node_modules/bootswatch/dist/cosmo/bootstrap.min.css";
```

#### e lembrando que aonde está cosmos é o nome do thema alvo que queremos

#### agora iremos adicionar uma barra customizada no nosso titulo e deixar ela trazendo os titulos de forma dinamica e também trazendo icones personalizados com o abrir de cada component, ficando assim nosso **titulo.component.html**:
```html
<div class="container d-flex justify-content-between p-3 my-3 text-white bg-secondary rounded shadow-sm">
  <div class="d-flex align-items-center lh-1">
    <i class="{{iconClass}} me-2" style="font-size: 32px;"></i>
    <div>
      <h1 class="h6 mb-0 text-white lh-1">{{titulo}}</h1>
      <small>{{subtitulo}}</small>
    </div>
  </div>
  <div class="d-flex align-items-center" *ngIf="botaoListar">
    <button type="button" class="btn btn-success">Listar {{titulo}}</button>
  </div>
</div>
```

#### e ficando assim nosso **titulo.component.ts**:
```javascript
  import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent {
@Input() titulo: string | undefined;
@Input() iconClass = 'fa fa-user';
@Input() subtitulo =  'Desde 2025'
@Input() botaoListar = false;

}
```
### Voltando ao Estilo do componentn **evento.component.html**:

#### neste momento iremos fazer algums modificações de estilo no evento component deixando ele mais bonito e responsivo para algums resoluações, para isso iremos adicionar algumas classes no qual irá ocultar algumas colunas da nossa tabela para poder ficar responsivo quando minimixado a tela da nossa aplicação ficando assim:
```html
<app-titulo [titulo]="'Eventos'" [iconClass]="'fa fa-tent'"></app-titulo>
<hr>
<div class="card p-2">
<div action="" class="form-inline mb-2">
    <div class="mb-2 row">
        <div class="col form-group d-flex align-items-center gap-2">
            <input 
                type="text" class="form-control" placeholder=Buscar
                [(ngModel)]="filtroLista"
            >
        </div>                
        <div class="col text-end">
            <button type="button" class="btn btn-success">
                Novo
            </button>
        </div>
    </div>
</div>
<table class="table table-dark">
    <thead class="text-center"> 
        <tr>
            <th>#</th>
            <th>
              <button
                class="btn btn-link p-0 m-0"
                (click)="isCollapsed = !isCollapsed"
                aria-label="Alternar exibição de imagem"
              >
                Image
              </button>
            </th>
            <th>Local</th>
            <th>Data</th>
            <th class="d-none d-md-table-cell">Qtd Pessoas</th>
            <th class="d-none d-md-table-cell">Lote</th>
            <th>Opções</th>
        </tr>
    </thead>
    <tbody class="table-striped">
        <tr *ngFor="let evento of eventosFiltrados" class="text-center">
            <td class="align-middle">{{evento.id}}</td>
            <td>
                <img src="../../assets/img/{{evento.imagemURL}}"  alt="" [collapse]="isCollapsed" [isAnimated]="true" style="width: 80px;">
            </td>
            <td class="align-middle">{{evento.local}}</td>
            <td class="align-middle">{{evento.dataEvento | DateTimeFormat }}</td>
            <td class="align-middle d-none d-md-table-cell">{{evento.qtdPessoas}}</td>
            <td class="align-middle d-none d-md-table-cell">{{evento.lotes}}</td>
            <td class="align-middle">
                <button tooltip="Excluir" type="button" class="btn btn-danger btn-sm" (click)="openModal(template)"><i class="fa-regular fa-circle-xmark fa-xl icon-hover"></i></button>
            </td>
        </tr>
    </tbody>
    <tfoot *ngIf="eventos && eventosFiltrados.length === 0">
            <tr class="table table-danger">
                <td  colspan="8" class="text-center"> 
                    <h3>Nenhum Evento Encontrado</h3>
                </td>
            </tr>
    </tfoot>
</table>
<ng-template #template>
  <div class="modal-body text-center">
    <p>Deseja Excluir Este Evento ?</p>
    <button type="button" class="btn btn-default" (click)="confirm()">Sim</button>
    <button type="button" class="btn btn-primary" (click)="decline()">Não</button>
  </div>
</ng-template>
</div>
<ngx-spinner type="ball-scale-multiple"></ngx-spinner>
```

#### logo após iremos criar um novo componente utilziando um scaffold para simplificar a criação, iremos utilizr a seguinte linha de comando para gerar o component:
```console
  ng g c components/eventos/evento-detalhe --module app
```
#### neste caso o scaffold irá gerar o componente no seguinte local com o seguinte nome, e também irá adicionar ja este componente ao --module app.

#### o novo component a ser gerado sera o **evento-lista** dentro do nosso diretório evento, pois esses novos components serao renderizados dentro do proprio component do evento, e para isso iremos mudar toda nossa estrutura do **evento.component.html** e **evento.component.ts**, fizemos varios ajustes, colocamos redirecionamento de rota caso entrar no path **/Eventos** ele sera redirecionado para **eventos/listar** para isso vamos iniciar mostrando a nova cara de nossos componentes de eventos, **Evento.Component.html**: 
```html
<app-titulo [titulo]="'Eventos'" [iconClass]="'fa fa-tent'" [botaoListar]="true"></app-titulo>
<hr>
<router-outlet></router-outlet>  // Utilizando router-outlet dentro deste component para ele poder reprocessar outros componentes
```
#### o nosso **eventos.component.ts**  nao tera mais nenhuma logica e para isso iremos fazer a configuração apartir do router-outlet para gerar as rotas para os filhos de nosso component evento, para isso iremos editar nosso **app-routing.module.ts**:
```javascript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { EventoListaComponent } from './components/eventos/evento-lista/evento-lista.component';
import { EventoDetalheComponent } from './components/eventos/evento-detalhe/evento-detalhe.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'perfil', component: PerfilComponent},


  { path: 'eventos', redirectTo: 'eventos/lista'}, 
  { path: 'eventos', component: EventosComponent, 
    children: 
      [
        {path: 'detalhes/:id', component: EventoDetalheComponent},
        {path: 'detalhes', component: EventoDetalheComponent},
        {path: 'lista', component: EventoListaComponent}
      ]
  },
  { path: 'contatos', component: ContatosComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'palestrantes', component: PalestrantesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

#### agora iremos dar atenção para nosso primeiro componente filho de evento, **evento-lista**, neste componente toda a logica que tinhamos direto no componente evento ira ser passada para ele, então ficara assim nosso arquivos **evento-lista.component.html**: 
```html
<div class="card p-2">
<div action="" class="form-inline mb-2">
    <div class="mb-2 row">
        <div class="col form-group d-flex align-items-center gap-2">
            <input 
                type="text" class="form-control" placeholder=Buscar
                [(ngModel)]="filtroLista"
            >
        </div>                
        <div class="col text-end">
            <button type="button" class="btn btn-success">
                Novo
            </button>
        </div>
    </div>
</div>
<table class="table table-dark table-hover" style="cursor: pointer">
    <thead class="text-center"> 
        <tr>
            <th>#</th>
            <th>
              <button
                class="btn btn-link p-0 m-0"
                (click)="isCollapsed = !isCollapsed"
                aria-label="Alternar exibição de imagem"
              >
                Image
              </button>
            </th>
            <th>Local</th>
            <th>Data</th>
            <th class="d-none d-md-table-cell">Qtd Pessoas</th>
            <th class="d-none d-md-table-cell">Lote</th>
            <th>Opções</th>
        </tr>
    </thead>
    <tbody class="table-striped">
        <tr *ngFor="let evento of eventosFiltrados" class="text-center" (click)="Redirecionardetalhes(evento.id)">
            <td class="align-middle">{{evento.id}}</td>
            <td>
                <img src="../../assets/img/{{evento.imagemURL}}"  alt="" [collapse]="isCollapsed" [isAnimated]="true" style="width: 80px;">
            </td>
            <td class="align-middle">{{evento.local}}</td>
            <td class="align-middle">{{evento.dataEvento | DateTimeFormat }}</td>
            <td class="align-middle d-none d-md-table-cell">{{evento.qtdPessoas}}</td>
            <td class="align-middle d-none d-md-table-cell">{{evento.lotes}}</td>
            <td class="align-middle">
                <button tooltip="Excluir" type="button" class="btn btn-danger btn-sm" (click)="openModal(template)"><i class="fa-regular fa-circle-xmark fa-xl icon-hover"></i></button>
            </td>
        </tr>
    </tbody>
    <tfoot *ngIf="eventos && eventosFiltrados.length === 0">
            <tr class="table table-danger">
                <td  colspan="8" class="text-center"> 
                    <h3>Nenhum Evento Encontrado</h3>
                </td>
            </tr>
    </tfoot>
</table>
<ng-template #template>
  <div class="modal-body text-center">
    <p>Deseja Excluir Este Evento ?</p>
    <button type="button" class="btn btn-default" (click)="confirm()">Sim</button>
    <button type="button" class="btn btn-primary" (click)="decline()">Não</button>
  </div>
</ng-template>
</div>
<ngx-spinner type="ball-scale-multiple"></ngx-spinner>
```

#### e nosso arquivo **evento-lista.component.ts** irá ficar da seguinte maneira:
```javascript
import { Component, inject, TemplateRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/models/Evento';
import { EventoService } from 'src/service/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {

  private eventoService = inject(EventoService);       // ✔️ injeção correta
  private modalService = inject(BsModalService);      // ✔️ injeção do serviço de modal
  private toastR = inject(ToastrService);            // ✔️ injeção do package de aviso
  private ngxSpinnerService = inject(NgxSpinnerService);

  private router = inject(Router)

  // modal
  modalRef?: BsModalRef;
  message?: string;

  // Estilos
  isCollapsed = false;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];

  public _filtroLista = "";


  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.getEventos();
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

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this._filtroLista
      ? this.filtrarEventos(this._filtroLista)
      : this.eventos;
  }

  openModal(template: TemplateRef<unknown>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.toastR.success('Evento Excluido com sucesso!', "Deletado!");
    this.modalRef?.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }

  Redirecionardetalhes(id: number) {
      this.router.navigate(['eventos/detalhes', id]);
  }
}
```

#### segue também como ficara nosso component **evento-detalhe.component.html**: 
```html
 <div class="card rounded shadow-sm">
    <form [formGroup]="form">
		<!-- <p>Form Name {{form.hasError}}</p>
		<p>Form Value {{form.value | json}}</p>
		<p>Form value: {{form.status | json}}</p> -->
    	<div class="p-3">
    		<div class="row">
    			<div class="col-md-12">
    				<label for="tema">Tema</label>
    				<input type="text" class="form-control"
					  [ngClass]="
					  {
						'is-invalid': f.tema?.errors && f.tema?.touched,
						'is-valid': f.tema?.valid && f.tema?.dirty
					  }"
					  formControlName="tema" placeholder="Insira o Tema">
					<div *ngIf="f.tema?.invalid && (f.tema?.dirty || f.tema?.touched)" class="invalid-feedback">
						<div *ngIf="f.tema?.errors.required && f.tema.touched">tema é Obrigatorio.</div>
						<div *ngIf="f.tema?.errors.minlength && f.tema.touched">tema deve ter no mínimo 4 caracteres</div>
						<div *ngIf="f.tema?.errors.maxlength && f.tema.touched">Tema deve ter no máximo 50 caracteres.</div>
					</div>
					<div *ngIf="f.tema?.valid" class="valid-feedback">Tema Valido.</div>
    			</div>
    		</div>
    		<div class="row">
    			<div class="col-md-8">
    				<label for="local">Local</label>
    				<input type="text" class="form-control" 
					[ngClass]="
					{
					   'is-invalid': f.local?.errors && f.local?.touched,
					   'is-valid': f.local?.valid && f.local?.dirty
					}"
					formControlName="local" placeholder="Local..."
					>
					<div *ngIf="f.local?.invalid && (f.local?.dirty || f.local.touched)" class="invalid-feedback">Local é Obrigatório</div>
					<div *ngIf="f.local?.valid" class="valid-feedback">Local Valido.</div>
    			</div>
    			<div class="col-md-4">
    				<label for="dataEvento">Data e Hora</label>
    				<input type="date" class="form-control"
					[ngClass]="
						{
							'is-invalid': f.dataEvento?.errors && f.dataEvento?.touched,
							'is-valid': f.dataEvento?.valid && f.dataEvento?.dirty
						}"
					formControlName="dataEvento" placeholder="">
					<div *ngIf="f.dataEvento?.invalid && (f.dataEvento?.dirty || f.dataEvento?.touched)" class="invalid-feedback">Data é Obrigatório</div>
					<div *ngIf="!f.dataEvento?.required" class="valid-feedback">Data Valida.</div>
    			</div>
    		</div>
    		<div class="row">
    			<div class="col-md-2">
    				<label for="qtdPessoas">Qtd Pessoas</label>
    				<input type="number" class="form-control"
					min="1"
						[ngClass]="
						{
							'is-invalid': f.qtdPessoas?.errors && f.qtdPessoas?.touched,
							'is-valid': f.qtdPessoas?.valid && f.qtdPessoas?.dirty,
						}"
						formControlName="qtdPessoas" placeholder="">
					<div *ngIf="f.qtdPessoas?.invalid && f.qtdPessoas?.touched" class="invalid-feedback">
						<div *ngIf="f.qtdPessoas?.errors.required && f.qtdPessoas?.touched">Qtd Pessoas é Obrigatório.</div>
						<div *ngIf="f.qtdPessoas?.maxlength && f.qtdPessoas?.touched">Qtd Pessoas muito alta</div>
					</div>
					<div *ngIf="f.qtdPessoas?.valid" class="valid-feedback">Ok !</div>
    			</div>
    			<div class="col-md-2">
    				<label for="telefone">Telefone</label>
    				<input type="number" class="form-control"
						min="1"
						[ngClass]="
							{
								'is-invalid': f.telefone?.errors && f.telefone?.touched,
								'is-valid': f.telefone?.valid && f.telefone?.dirty,
							}"
						formControlName="telefone" placeholder="(000) 90000-0000">
					<div *ngIf="f.telefone?.invalid && f.telefone?.touched" class="invalid-feedback">Telefone é obrigatório</div>
					<div *ngIf="f.telefone?.valid" class="valid-feedback">Telefone é Valido!</div>
    			</div>
    			<div class="col-md-4">
    				<label for="email">Email</label>
    				<input type="email" class="form-control"
						[ngClass]="
						{
							'is-invalid': f.email?.errors && f.email?.touched,
							'is-valid': f.email?.valid && f.email?.dirty
						}"
					 	formControlName="email" placeholder="e-mail">
					<div *ngIf="f.email?.invalid && (f.email.touched || f.email?.dirty)" class="invalid-feedback">
						<div *ngIf="f.email?.errors.required">É Necessario digitar o E-mail.</div>
						<div *ngIf="f.email?.errors.email && f.email">Email Inválido</div>
					</div>					
					<div *ngIf="f.email?.valid" class="valid-feedback">Email Valido</div>
    			</div>
				<div class="col-md-4">
    				<label for="imagemURL">Imagem</label>
    				<input type="text" class="form-control" 
						[ngClass]="
						{
							'is-invalid': f.imagemURL.errors && f.imagemURL.touched,
							'is-valid': f.imagemURL.valid && f.imagemURL.dirty
						}"
						formControlName="imagemURL" placeholder="imagem">
					<div *ngIf="f.imagemURL?.errors?.required && f.imagemURL?.touched" class="invalid-feedback">Imagem é obrigatório</div>
					<div *ngIf="f.imagemURL?.valid && f.imagemURL?.touched" class="valid-feedback">Imagem é Valida</div>

    			</div>
    		</div>
    	</div>
		<div class="card card-footer p-2">
			<div class="row justify-content-evenly mx-1">
				<div class="col">
					<button class="btn btn-outline-secondary mr-auto border" (click)="resetarForm()">
						Cancelar Alteração
					</button>
				</div>
				<div class="col text-end">
					<button class="btn btn-success" type="submit" [disabled]="form.invalid">
						Salvar Alteração
					</button>
				</div>
			</div>
		</div>
    </form>
</div>
```

#### **evento-detalhe.component.ts**: 
```javascript
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {
  private fb = inject(FormBuilder)
  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {  
    this.validation();
  }

  public validation(): void
  {
    this.form = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(12000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: ['', Validators.required],
    });
  }

  resetarForm() {
    this.form.reset();
  }

}

```

#### agora temos mais uma questão a ser resolvida, quando entramos em eventos, palestrantes e contatos exibimos o botão listar "o nome do component", como essa informação fica dentro do component do titulo, apartir dele iremos configurar o redirecionamento de rota para quando clicarmos em listar ele trazer a rota correspondente ao component pai e filho do component, para isso iremos configurar nosso **titulo.component.ts** da seguinte forma:

```html
<div class="container d-flex justify-content-between p-3 my-3 text-white bg-secondary rounded shadow">
  <div class="d-flex align-items-center lh-1">
    <i class="{{iconClass}} me-2" style="font-size: 32px;"></i>
    <div>
      <h1 class="h6 mb-0 text-white lh-1">{{titulo}}</h1>
      <small>{{subtitulo}}</small>
    </div>
  </div>
  <div class="d-flex align-items-center" *ngIf="botaoListar">
    <button type="button" class="btn btn-success" (click)="redirecionarListagem()">Listar {{titulo}}</button>
  </div>
</div>
```
#### **titulo.component.ts**:
```javascript
import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent {

  //injeções
  private router = inject(Router)
  private route = inject(ActivatedRoute)

  @Input() titulo: string | undefined;
  @Input() iconClass = 'fa fa-user';
  @Input() subtitulo =  'Desde 2025'
  @Input() botaoListar = false;

  redirecionarListagem(): void {
    this.router.navigate(['lista'], {relativeTo: this.route})
  }
}
```
#### na linha redirecionarListam() é a função que ira se adaptar para cada componente que ira renderizer o titulo e preparar ela para redirecionar apartir do elemnto pai.

### o próximo passo agora é realizar o funcionamento do redirecionamento para o component filho **evento-detalhes** no qual quando selecionarmos um evento na lista ele ira chamar o component de detalhes, com o id do evento na rota para trabalhar com a edição daquele registro, assim alterando alguma informação do mesmo, para isso em nosso **evento-listar.component.html** iremos observar a seguinte modificação para que isso seja possivel:

#### nesta linha do nosso component **evento-lista.component.html** temos a atribuição de uma função de redirecionamento passando o id daquele evento como parametro do redirecionamento,
```html
  <tr *ngFor="let evento of eventosFiltrados" class="text-center" (click)="Redirecionardetalhes(evento.id)">
```

#### e temos esta função em nosso component **evento-datalhe.component.ts** para fazer o redirecionamento para detalhes ja com o id na rota:
```javascript
  Redirecionardetalhes(id: number) {
      this.router.navigate(['eventos/detalhes', id]);
  }
```

### User Components, agora iremos seguir adicionando os components e filhos que pertence a Usuario, ou seja; registro, login, registro de rede social e detalhes de perfil, eventos e lote.

#### inicaremos criando o component pai de user com o seguinte comando:
```console
  ng g c components/user --module app
```

#### **user.component.html:**: 
```html
<div class="container">
  <router-outlet></router-outlet>
</div>
```

#### comopnent de login:
```console
  ng g c components/user/login --module app
```

#### **login.component.html**:
```html
<div class="d-flex align-items-center vh-100">
	<div class="mx-auto text-center shadow-sm bg-white rounded p-5 my-5">
		<form class="form-signin">
			<i class="fa fa-users mb-2"></i>
			<h1 class="h3 mb-3 font-weight-normal">Entrar com</h1>
			<label for="username" class="sr-only">Usuário</label>
			<input type="email" id="username" class="form-control" placeholder="Usuário" name="username" required>
			<label for="password" class="sr-only">Password</label>
			<input type="password" id="password" class="form-control" placeholder="Senha" name="password" required>
			<button class="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
			<p class="mt-4 mb-2 text-muted">Não tem login? Cadastre-se abaixo</p>
			<a class="btn btn-lg btn-link btn-block" routerLink="/user/registration">Quero me cadastrar</a>
		</form>
	</div>
</div>
```

#### **registration component**: 
```console
  ng g c components/user/registration --module app
```
#### **registration.component.**html:
```html
<div class="row mt-4">
	<div class="col-md-6 d-none d-md-block" style="height: 450px;">
		<div class="text-center col-md-12 my-auto side-heder">
			<h1>Cadastro de Usuário</h1>
			<img src="../../../../assets/img/img2.png" class="my-4" alt="" width="400px">
		</div>
	</div>
	<div class="col-md-6">
<form class="p-1">
	<div class="pb-2 d-block d-md-none">
		<h3 class="border-bottom">Cadastro de Usuário</h3>
	</div>
	<div class="row">
		<div class="col-sm-6">
			<label class="form-label">Primeiro Nome</label>
			<input type="text" class="form-control" placeholder="Insira o Primeiro nome" />
		</div>
		<div class="col-sm-6">
			<label class="form-label">Último nome</label>
			<input type="text" class="form-control" placeholder="Insira o Último nome" />
		</div>
	</div>
	<div>
		<label for="">Email:</label>
		<input class="form-control" type="text" placeholder="Insira o Nome Completo" />
	</div>
	<div>
		<label class="form-label" for="">Usuario:</label>
		<input class="form-control" type="text" placeholder="Insira o nome de Usuário" />      
	</div>
	<div class="row mt-2">
		<div class="col-sm-6">
			<label for="" class="form-label">Senha:</label>
			<input class="form-control" type="password" placeholder="Digite uma Senha" />
		</div>
		<div class="form-group col-sm-6">
			<label for="" class="form-label">Confirmar Senha:</label>
			<input class="form-control" type="password" placeholder="Confirme a Senha" />
		</div>
	</div>
	<div class="row p-1 mb-3">
		<div class="custom-control custom-checkbox">
			<input type="checkbox" class="custom-control-input mx-2" id="customCheck1">
			<label class="custom-control-label">Eu concordo com os <a href="#">Termos de Uso</a>.</label>
		</div>
	</div>
	<div class="form-row">
		<div class="form-group col-12">
			<button class="btn btn-lg btn-success btn-block px-5">
				Registrar
			</button>
		</div>
	</div>
	<div class="form-row">
		<div class="form-group col-12">
			<a class="btn btn-link btn-block" routerLink="/user/login">
				Já sou Cadastrado
			</a>
		</div>
	</div>
</form>
	</div>
</div>
```

#### component de perfil:
```console
  ng g c components/user/perfil --module app
```

#### **perfil.component.html**: 
```html
<app-titulo [titulo]="'Perfil'" [botaoListar]="false"></app-titulo>
<div class="card rounded shadow-sm">
	<form [formGroup]="formularioPerfil">
		<div class="row p-3">
			<div class="col-lg-3 pt-1">
				<div class="card mb-3">
							<!-- <pre>{{formularioPerfil.value | json}}</pre>
							<pre>{{formularioPerfil.status | json}}</pre>
							<pre>Errors confirmar senha: {{f.confirmarSenha.errors | json}}</pre>
							<pre>Valido Confirmar senha: {{f.confirmarSenha.valid | json}}</pre> -->
					<div class="card-header"></div>
					<div class="d-flex align-self-center pt-3">
						<a>
							<img
							src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRbezqZpEuwGSvitKy3wrwnth5kysKdRqBW54cAszm_wiutku3R"
							name="aboutme" width="120" height="120" class="rounded-circle">
						</a>
					</div>
					<div class="card-body">
						<div class="h4 text-center mb-3">@UserName</div>
						<div class="h7 text-bold pb-1"><b>Nome:</b> Miracles Lee Cross</div>
						<div class="h7">
							Developer of web applications, JavaScript, PHP, Java, Python, Ruby, Java, Node.js,
							etc.
						</div>
					</div>
					<ul class="list-group list-group-flush">
						<li class="list-group-item">
							<div class="row">
								<div class="col-6 text-center border-right">
									<div class="h5">1342</div>
									<div class="h6 text-muted">Eventos Ministrados</div>
								</div>
								<div class="col-6 text-center">
									<div class="h5">1342</div>
									<div class="h6 text-muted">Eventos Participados</div>
								</div>
							</div>
						</li>
					</ul>
					<div class="card-footer"></div>
				</div>
			</div>
			<div class="col-lg-9">
				<div class="row">
					<div class="col-12">
						<h3 class="border-bottom">Detalhe Perfil</h3>
					</div>
					<div class="col-sm-3">
						<label>Título</label>
						<select
							class="form-control" 
							formControlName="titulo" 
							[ngClass]="
							{
								'is-invalid': f.titulo?.invalid && f.titulo?.touched,
								'is-valid': f.titulo?.valid
							}"
						>
							<option value="NaoInformado">Não Quero</option>
							<option value="Tecnologo">Tecnólogo(a)</option>
							<option value="Bacharel">Bacharel</option>
							<option value="Especialista">Especialista</option>
							<option value="PosGraduado">Pós Graduado(a)</option>
							<option value="Mestrado">Mestre</option>
							<option value="Doutorado">Doutor(a)</option>
							<option value="PosDoutorado">Pós Doc</option>
						</select>
						<div *ngIf="f.titulo?.errors && (f.titulo?.touched || f.titulo?.dirty)" class="invalid-feedback">Campo Obrigatorio</div>
						<div *ngIf="f.titulo?.valid && (f.titulo?.touched || f.titulo?.dirty)" class="valid-feedback">Ok.</div>
					</div>

					<div class="col-sm-5">
						<label>Primeiro Nome</label>
						<input
							type="text"
							class="form-control"
							formControlName="primeiroNome"
							[ngClass]="
							{
								'is-invalid': f.primeiroNome?.errors && f.primeiroNome?.touched,
								'is-valid': f.primeiroNome?.valid,
							}"
						/>
					<div *ngIf="f.primeiroNome?.invalid" class="invalid-feedback">Nome Obrigatório.</div>
					<div *ngIf="f.primeiroNome?.valid" class="valid-feedback">Ok.</div>
					</div>
					<div class="col-sm-4">
						<label>Último nome</label>
						<input 
							type="text"
							class="form-control"
							formControlName="ultimoNome"
							[ngClass]="
							{
								'is-invalid': f.ultimoNome?.errors && f.ultimoNome?.touched,
								'is-valid': f.ultimoNome?.valid,
							}"
						/>
						<div *ngIf="f.ultimoNome?.invalid" class="invalid-feedback">
							<div *ngIf="f.ultimoNome?.errors.required && (f.ultimoNome?.touched || f.ultimoNome?.dirty)">Ultimo Nome Obrigatório.</div>
						</div>
						<div *ngIf="f.ultimoNome?.valid" class="valid-feedback">Ok.</div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-5">
						<label>E-mail</label>
						<input
							type="email" 
							class="form-control" 
							formControlName="email"
							[ngClass]="
							{
								'is-invalid': f.email?.errors && f.email.touched,
								'is-valid': f.email?.valid
							}"
						/>
						<div *ngIf="f.email?.errors && (f.email?.dirty || f.email?.touched)" class="invalid-feedback">
							<div *ngIf="f.email?.errors.email" >Email é Invalido</div>
							<div *ngIf="f.email?.errors.required" >Email é obrigatório</div>
						</div>
						<div *ngIf="f.email?.valid" class="valid-feedback">Ok.</div>
					</div>
					<div class="col-sm-4">
						<label>Telefone</label>
						<input 
							type="tel" 
							class="form-control" 
							placeholder="(000) 0000000"
							formControlName="telefone"
							pattern="[0-9]*"
							[ngClass]="
							{
								'is-invalid': f.telefone?.errors && f.telefone?.touched,
								'is-valid': f.telefone?.valid
							}"
						/>
					<div *ngIf="f.telefone?.errors && (f.telefone?.touched || f.telefone?.dirty)" class="invalid-feedback">
						<div *ngIf="f.telefone?.errors.pattern">Numero Inválido.</div>
						<div *ngIf="f.telefone?.errors.required">Numero Obrigatório.</div>
					</div>
					<div *ngIf="f.telefone.valid" class="valid-feedback">Ok.</div>
					</div>
					<div class="col-sm">
						<label>Função</label>
						<select
							class="form-control"
							formControlName="funcao"
							[ngClass]="
							{
								'is-invalid': f.funcao?.errors && f.funcao?.touched,
								'is-valid': f.funcao?.valid,
							}"
						>
							<option value="participante">Participante</option>
							<option value="palestrante">Palestrante</option>
						</select>
						<div *ngIf="f.funcao?.errors && (f.funcao?.touched || f.funcao?.dirty)" class="invalid-feedback">
							<div *ngIf="f.funcao.errors?.required && (f.funcao?.dirty || f.funcao?.touched)">Obrigatório selecionar uma Função.</div>
						</div>
						<div *ngIf="f.funcao?.valid" class="valid-feedback">Ok.</div>
					</div>
					<div class="col-12">
						<label>Descrição</label>
						<input 
							type="text"
							class="form-control"
							formControlName="descricao"
							[ngClass]="{'is-valid': f.descricao?.touched}"
						/>
					</div>
				</div>
				<div>
					<h3 class="pt-3 border-bottom">Mudar Senha</h3>
					<p>Caso mude de senha, preencha os campos abaixo:</p>
				</div>
				<div class="row mb-2">
					<div class="col-sm">
						<label>Senha</label>
						<input 
							type="password" 
							class="form-control" 
							formControlName="senha"
							[ngClass]="
							{
								'is-invalid': f.senha?.errors && f.senha?.touched,
								'is-valid': f.senha?.valid,
							}"
						/>
						<div *ngIf="f.senha?.errors && (f.senha?.touched || f.senha?.dirty)" class="invalid-feedback">
							<div *ngIf="f.senha?.errors?.required && (f.senha?.touched || f.senha?.dirty)">Senha é obrigatório.</div>
						</div>
						<div *ngIf="f.senha?.valid" class="valid-feedback">Senha Ok.</div>
					</div>
					<div class="col-sm">
						<label>Confirmar Senha</label>
						<input
							type="password"
							class="form-control"
							formControlName="confirmarSenha"
							[ngClass]="
							{
								'is-invalid': f.confirmarSenha?.errors && f.confirmarSenha?.touched,
								'is-valid': f.confirmarSenha?.valid,
							}"
						/>
						<div *ngIf="f.confirmarSenha?.errors && ( f.confirmarSenha?.touched || f.confirmarSenha?.dirty)" class="invalid-feedback">
								<div *ngIf="f.confirmarSenha?.errors?.required && (f.confirmarSenha?.touched || f.confirmarSenha?.dirty)">Confirmar senha é Obrigatório.</div>
								<div *ngIf="f.confirmarSenha?.errors?.passwordMismatch && (f.confirmarSenha?.touched || f.confirmarSenha?.dirty)">Senhas não coencidem.</div>
						</div>
						<div *ngIf="f.confirmarSenha?.valid" class="valid-feedback">Ok.</div>
					</div>
				</div>
			</div>
		</div>
		<div class="card card-footer p-2">
			<div class="row justify-content-evenly mx-1">
				<div class="col">
					<button class="btn btn-outline-secondary mr-auto border">
						Cancelar Alteração
					</button>
				</div>
				<div class="col text-end">
					<button class="btn btn-success" [disabled]="!formularioPerfil.valid">
						Salvar Alteração
					</button>
				</div>
			</div>
		</div>
	</form>
</div>
```

#### **perfil.comopnent.ts**:
```js
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../shared/custom-validators/custom-Validators.directive'
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {

private fb = inject(FormBuilder);
formularioPerfil! : FormGroup;

ngOnInit(): void {
  this.criarFormulario();
}

get f(): any {
  return this.formularioPerfil.controls;
}

criarFormulario(): void {
  this.formularioPerfil = this.fb.group({
    titulo:['', Validators.required],
    primeiroNome:['', Validators.required],
    ultimoNome:['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    telefone:['', Validators.required],
    funcao:['', Validators.required],
    descricao:[''],
    senha:['', Validators.required],
    confirmarSenha:['',Validators.required]
  },
  {
    validators: CustomValidators.passwordMatch('senha', 'confirmarSenha')
  })
}


}
```

#### rotas ninhas dos novos componentes de user, **app.routing.module.ts**: 
```js
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContatosComponent } from './components/contatos/contatos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';

import { EventosComponent } from './components/eventos/eventos.component';
import { EventoListaComponent } from './components/eventos/evento-lista/evento-lista.component';
import { EventoDetalheComponent } from './components/eventos/evento-detalhe/evento-detalhe.component';

import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { RegistrationComponent } from './components/user/registration/registration.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},

  { path: 'eventos', redirectTo: 'eventos/lista'}, 
  { path: 'eventos', component: EventosComponent, 
    children: 
      [
        {path: 'detalhes/:id', component: EventoDetalheComponent},
        {path: 'detalhes', component: EventoDetalheComponent},
        {path: 'lista', component: EventoListaComponent}
      ]
  },

  {
    path: 'user', component: UserComponent,
    children: 
    [
      {path: 'registration', component: RegistrationComponent},
      {path: 'perfil', component: PerfilComponent},
      {path: 'login', component: LoginComponent}
    ]
  },

  { path: 'contatos', component: ContatosComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'palestrantes', component: PalestrantesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### Iniciando Reactive Forms, apartir de agora iremos adicionar os reactive forms em nossa aplicação, e iniciaremos apartir de nosso component de **eventos-detalhes.component.html** / **eventos-detalhes.component.ts**: 

#### **eventos-detalhes.component.html**:
```html
 <div class="card rounded shadow-sm">
    <form [formGroup]="form">
		<!-- <p>Form Name {{form.hasError}}</p>
		<p>Form Value {{form.value | json}}</p>
		<p>Form value: {{form.status | json}}</p> -->
    	<div class="p-3">
    		<div class="row">
    			<div class="col-md-12">
    				<label for="tema">Tema</label>
    				<input type="text" class="form-control"
					  (blur)="f.tema?.markAsTouched()"
					  [ngClass]="{'is-invalid': f.tema?.errors && f.tema.touched}"
					  formControlName="tema" placeholder="Insira o Tema"
					>
					<div *ngIf="f.tema?.errors.required && f.tema.touched" class="invalid-feedback">tema é obrigatório</div>
					<div *ngIf="f.tema?.errors.minlength && f.tema.touched" class="invalid-feedback">tema deve ter no mínimo 4 caracteres</div>
					<div *ngIf="f.tema?.errors.maxlength && f.tema.touched" class="invalid-feedback">Tema deve ter no máximo 50 caracteres.</div>
    			</div>
    		</div>
    		<div class="row">
    			<div class="col-md-8">
    				<label for="local">Local</label>
    				<input type="text" class="form-control" 
					 (blur)="f.local?.markAsTouched()"
					[ngClass]="{'is-invalid': f.local?.errors && f.local?.touched}"
					formControlName="local" placeholder="">
					<div *ngIf="f.local?.errors.required && f.local.touched" class="invalid-feedback">Local é Obrigatório</div>
    			</div>
    			<div class="col-md-4">
    				<label for="dataEvento">Data e Hora</label>
    				<input type="datetime" class="form-control"
					[ngClass]="{'is-invalid': f.dataEvento?.errors && f.dataEvento?.touched}"
					formControlName="dataEvento" placeholder="">
					<div *ngIf="f.dataEvento?.errors.required && f.dataEvento.touched" class="invalid-feedback">Data e Hora é obrigatório</div> 
    			</div>
    		</div>
    		<div class="row">
    			<div class="col-md-2">
    				<label for="qtdPessoas">Qtd Pessoas</label>
    				<input type="number" class="form-control"
						[ngClass]="{'is-invalid': f.qtdPessoas?.errors && f.qtdPessoas.touched}"
						formControlName="qtdPessoas" placeholder="">
					<div *ngIf="f.qtdPessoas?.errors.required && f.qtdPessoas.touched" class="invalid-feedback">Qtd Pessoas é obrigatório</div>
					<div *ngIf="f.qtdPessoas?.errors.max && f.qtdPessoas.touched" class="invalid-feedback">Qtd Pessoas muito alta</div>
    			</div>
    			<div class="col-md-2">
    				<label for="telefone">Telefone</label>
    				<input type="text" class="form-control" 
						[ngClass]="{'is-invalid': f.telefone?.errors && f.telefone.touched}"
						formControlName="telefone" placeholder="(000) 90000-0000">
					<div *ngIf="f.telefone?.errors.required && f.telefone.touched" class="invalid-feedback">Telefone é obrigatório</div>
    			</div>
    			<div class="col-md-4">
    				<label for="email">Email</label>
    				<input type="email" class="form-control"
						[ngClass]="{'is-invalid': f.email.errors.required && f.email.touched}"
					 	formControlName="email" placeholder="e-mail">
					<div *ngIf="f.email?.errors.required && f.email.touched" class="invalid-feedback">Email é obrigatório</div>
					<div *ngIf="f.email?.errors.email && f.email.touched" class="invalid-feedback">Email Inválido</div>
    			</div>
				<div class="col-md-4">
    				<label for="imagemURL">Imagem</label>
    				<input type="text" class="form-control" 
						[ngClass]="{'is-invalid': f.imagemURL.errors && f.imagemURL.touched}"
						formControlName="imagemURL" placeholder="imagem">
					<div *ngIf="f.imagemURL.errors.required && f.imagemURL.touched" class="invalid-feedback">Imagem é obrigatório</div>
    			</div>
    		</div>
    	</div>
		<div class="card card-footer p-2">
			<div class="row justify-content-evenly mx-1">
				<div class="col">
					<button class="btn btn-outline-secondary mr-auto border" (click)="resetarForm()">
						Cancelar Alteração
					</button>
				</div>
				<div class="col text-end">
					<button class="btn btn-success" type="submit" [disabled]="!form.invalid">
						Salvar Alteração
					</button>
				</div>
			</div>
		</div>
    </form>
</div>
```

#### **eventos-detalhes.component.ts**
```js
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {
  private fb = inject(FormBuilder)
  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {  
    this.validation();
  }

  public validation(): void
  {
    this.form = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(12000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: ['', Validators.required],
    });
  }

  resetarForm() {
    this.form.reset();
  }

}
```

#### agora iremos fazer **registration.component.html**:
#### component de perfil:
```console
  ng g c components/user/registration --module app
```
```html
<div class="row mt-4">
	<div class="col-md-6 d-none d-md-block" style="height: 450px;">
		<div class="text-center col-md-12 my-auto side-heder">
			<h1>Cadastro de Usuário</h1>
			<img src="../../../../assets/img/img2.png" class="my-4" alt="" width="400px">
			<!-- <p>Form Value: {{form.value | json}}</p>
			<p>Form Status: {{form.status | json}}</p> -->
		</div>
	</div>
	<div class="col-md-6">
<form class="p-1" [formGroup]="form" (ngSubmit)="onClickRegistrar()">
	<div class="pb-2 d-block d-md-none">
		<h3 class="border-bottom">Cadastro de Usuário</h3>
	</div>
	<div class="row">
		<div class="col-sm-6">
			<label class="form-label" for="primeiroNome">Primeiro Nome</label>
    		<input type="text" class="form-control"
			  [ngClass]="
			  {
				'is-invalid': (f.primeiroNome?.errors && f.primeiroNome?.touched),
				'is-valid': f.primeiroNome?.touched && f.primeiroNome?.touched
			  }"
			  formControlName="primeiroNome" placeholder="Primeiro Nome"
			>
			<div *ngIf="f.primeiroNome?.invalid && (f.primeiroNome?.dirty || f.primeiroNome?.touched)" class="invalid-feedback">	
				<div *ngIf="f.primeiroNome?.errors.required">Nome Obrigatório.</div>
				<div *ngIf="f.primeiroNome?.errors.minlength">Nome é muito curto.</div>
			</div>
			<div *ngIf="f.primeiroNome?.valid" class="valid-feedback">Nome Valido.</div>
		</div>
		<div class="col-sm-6">
			<label class="form-label" for="ultimoNome">Último nome</label>
			  <input type="text" class="form-control"
			  [ngClass]="
			  {
				'is-invalid': (f.ultimoNome?.errors && f.ultimoNome?.touched),
				'is-valid': f.ultimoNome?.valid&& f.ultimoNome?.touched
			  }
			  "
			  formControlName="ultimoNome" placeholder="Ultimo nome"
			>
			<div *ngIf="f.ultimoNome?.invalid && (f.ultimoNome?.dirty || f.ultimoNome?.touched)" class="invalid-feedback">
				<div *ngIf="f.ultimoNome?.errors.required && f.ultimoNome?.touched">Ultimo nome é Obrigatorio.</div>
				<div *ngIf="f.ultimoNome?.errors.minlength && f.ultimoNome?.touched">Ultimo nome Muito Curto.</div>
			</div>
			<div *ngIf="f.ultimoNome?.valid" class="valid-feedback">Ultimo Nome Valido.</div>

		</div>
	</div>
	<div>
		<label class="form-label" for="email">Email</label>
		<input type="email" class="form-control"
		[ngClass]="
		{
			'is-invalid': f.email?.errors && f.email?.touched,
			'is-valid': f.email?.valid && f.email?.touched
		}"
		formControlName="email" placeholder="E-mail"
		>
		<div *ngIf="f.email?.invalid && (f.ultimoNome?.dirty || f.email?.touched)" class="invalid-feedback">
			<div *ngIf="f.email?.errors.required && f.email?.touched">E-mail é Obrigatorio.</div>
			<div *ngIf="f.email?.errors.email && f.email?.touched">E-mail Inválido</div>
		</div>
		<div *ngIf="f.ultimoNome?.valid" class="valid-feedback">E-mail Valido.</div>
	</div>
	<div>
		<label class="form-label" for="userName">user Name:</label>
		<input type="text" class="form-control" autocomplete="username"
		[ngClass]="
		{
		   'is-invalid': f.userName?.errors && f.userName?.touched,
		   'is-valid': f.userName?.valid && f.userName?.touched
		}"
		formControlName="userName" placeholder="Username"
		>
		<div *ngIf="f.userName?.invalid && (f.userName?.dirty || f.userName?.touched)" class="invalid-feedback">
			<div *ngIf="f.userName?.errors.required && f.userName?.touched">Username é Obrigatorio.</div>
		</div>
		<div *ngIf="f.userName?.valid" class="valid-feedback">UserName Valido.</div>
		
	</div>
	<div class="row mt-2">
		<div class="col-sm-6">
			<label for="password" class="form-label">Senha:</label>
			<input type="password" class="form-control" autocomplete="new-password"
			[ngClass]="
			{
			   'is-invalid': f.password?.invalid && f.password?.touched,
			   'is-valid': f.password?.valid && f.password?.touched
			}"
			formControlName="password" placeholder="Password"
			>
			<div *ngIf="f.password?.invalid && (f.password?.dirty || f.password?.touched)" class="invalid-feedback">
				<div *ngIf="f.password?.errors.required && f.password?.touched">Senha é Obrigatório.</div>
			</div>
			<div *ngIf="f.password?.valid" class="valid-feedback">Password Valido.</div>
		</div>
		<div class="form-group col-sm-6">
			<label for="passwordConfirm" class="form-label">Confirmar Senha:</label>
			<input type="password" class="form-control" autocomplete="new-password"
			[ngClass]="
			{
				'is-invalid': f.passwordConfirm?.errors && f.passwordConfirm?.touched,
				'is-valid': f.passwordConfirm?.valid && f.passwordConfirm?.touched,
			}"
			formControlName="passwordConfirm" placeholder="Password"
			>
			<div *ngIf="f.passwordConfirm?.invalid && (f.passwordConfirm?.dirty || f.passwordConfirm?.touched)" class="invalid-feedback">
				<div *ngIf="f.passwordConfirm?.errors.required && f.passwordConfirm?.touched">Confirme a senha!</div>				
				<div *ngIf="f.passwordConfirm?.errors.passwordMismatch && f.passwordConfirm.touched">Senhas não coincidem!</div>				
			</div>
			<div *ngIf="f.passwordConfirm.valid" class="valid-feedback">Confirmação Valida.</div>
		</div>
	</div>
	<div class="row p-1 mb-3">
		<div class="custom-control custom-checkbox">
			<input type="checkbox" class="custom-control-input mx-2" id="customCheck1"formControlName="termos"   [ngClass]="{'is-invalid': f.termos.invalid && f.termos.touched}">
			<label class="custom-control-label" for="customCheck1">Eu concordo com os <a href="#">Termos de Uso</a>.</label>
			<div *ngIf="f.termos?.invalid && (f.termos?.dirty || f.termos?.touched)" class="invalid-feedback">
				<div *ngIf="f.termos?.invalid && f.termos?.touched" class="d-block">Termo é Obrigatorio.</div>
			</div>
		</div>
	</div>
	<div class="form-row">
		<div class="form-group col-12">
			<!-- <p>{{form.status | json}}</p> -->
			<button type="submit" class="btn btn-lg btn-success px-5" [disabled]="!form.valid">
				Registrar
			</button>
		</div>
	</div>
	<div class="form-row">
		<div class="form-group col-12">
			<a class="btn btn-link btn-block" routerLink="/user/login">
				Já sou Cadastrado
			</a>
		</div>
	</div>
</form>
	</div>
</div>
```

#### e também o **registration.component.ts**: 
```javascript
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { passwordMatch } from 'src/app/shared/custom-validators/custom-Validators.directive';
import { User } from 'src/models/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  private toastR = inject(ToastrService); 
  private userService = inject(UserService);
  private ngxSpinnerService = inject(NgxSpinnerService);
  private fb = inject(FormBuilder);

  form!: FormGroup;
  public _user!: User;

  ngOnInit() {
    this.validation();
  }

  get f(): any {
    return this.form.controls;
  }

  public validation() {
    this.form = this.fb.group(
      {
        userName: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.minLength(4), Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        passwordConfirm: ['', [Validators.required, Validators.minLength(4)]],
        primeiroNome: ['', [Validators.required, Validators.minLength(4)]],
        ultimoNome: ['', [Validators.required, Validators.minLength(4)]],
        termos: [false, [Validators.requiredTrue]],
      },
      { validators: passwordMatch('password', 'passwordConfirm') } // validador de grupo, mais de um formControll
    );
  }

  onClickRegistrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // força mostrar erros
      this.toastR.warning('Preencha todos os campos corretamente.');
      return;
    }

    const user: User = this.form.value;

    this.ngxSpinnerService.show();

    this.userService.registerUser(user).subscribe({
      next: () => {
        this.toastR.success('Usuário registrado com sucesso!');
        this.form.reset();
      },
      error: (error) => {
        this.toastR.error('Erro ao registrar usuário.');
        console.error(error);
      },
      complete: () => this.ngxSpinnerService.hide()
    });
  }
}
```

#### para concluir o funcionamento deste componente foi necessario adicionar um novo componente para gerenciar nossas validações de formulario pois nem todas funções disponiveis no angular irá atender nossa necessidade, e para isso geramos um novo component no diretório **shared**, para abrir as validações customizadas que iremos criando ao decorrer do projeto, para isso criamos o component com nome **custom-validators**:
```console        
  ng g c shared/custom-validators.directive.ts
```
#### agora iremos configurar nossa nova classe shared criando a primeira validação customizada para nossa aplicação, e esta primeira validação é para password match, configuramos agora o arquivo **custom-validators.directive.ts**:
```javascript
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatch(password: string, confirmPassword: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passwordControl = formGroup.get(password);
    const confirmPasswordControl = formGroup.get(confirmPassword);

    if (!passwordControl || !confirmPasswordControl) return null;

    // Se os valores não batem, define o erro no confirmPassword
    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      // Remove o erro se antes existia e agora é válido
      if (confirmPasswordControl.hasError('passwordMismatch')) {
        confirmPasswordControl.setErrors(null);
      }
    }

    return null; // Importante: não retorna erro no grupo
  };
}
```

#### agora iremos trabalhar no componente de editar evento, **evento-detalhe.component.html** / .ts iremos adicionar a função para quando clicarmos no evento da lista redirecionar para a pagina de detalhes do evento para poder alterar as informações dele.

#### eventos-detalhe.component.ts:
```js

```