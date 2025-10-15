# 📖 Guia de Construção: ProEventos Full Stack (.NET + Angular)

Bem-vindo(a) ao repositório do projeto **ProEventos**! 🚀

Este documento não é apenas um `README`, mas um **manual completo e detalhado** que registra a jornada de construção de uma aplicação Full Stack do zero. Aqui você encontrará um passo a passo linear, desde a criação da solução .NET com arquitetura em camadas até o desenvolvimento de um frontend moderno e reativo com Angular.

O objetivo é servir como uma base de conhecimento e um registro prático da aplicação de conceitos como **ASP.NET Identity, Entity Framework, Padrão Repositório, JWT, Roteamento em Angular, Reactive Forms** e muito mais.

![.NET](https://img.shields.io/badge/.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Entity Framework](https://img.shields.io/badge/EF%20Core-512BD4?style=for-the-badge)

---

## 🗺️ Sumário

Este guia está dividido em duas partes principais. Use os links abaixo para navegar rapidamente:

<details>
  <summary><b>⚙️ Parte 1: Construindo o Backend com .NET</b></summary>
  
  - [1. Criando a Solução e as Camadas](#1-criando-a-solução)
  - [2. Estruturando a Camada de Domínio](#2-iniciando-a-estrutura-do-domain)
  - [3. Configurando a Camada de Persistência](#3-criando-persistencia)
  - [4. Estruturando a Camada de Aplicação](#4-criando-camada-de-aplicação)
  - [5. Mapeamento com Fluent API](#5-fluenteapi)
  - [6. Configurando a Camada de API](#7-api)
  - [7. Implementando Autenticação com JWT e Identity](#8-autenticação-jwt)
</details>

<details>
  <summary><b>🎨 Parte 2: Construindo o Frontend com Angular</b></summary>
  
  - [1. Configuração Inicial do Projeto](#-1-instalação-de-dependências-iniciais)
  - [2. Criação de Componentes e Integração com API](#-5-criação-de-componentes)
  - [3. Estilização com Bootstrap e FontAwesome](#-8-instalação-de-fontawesome-e-ngx-bootstrap)
  - [4. Data Binding, Filtros e Diretivas](#-10-interpolação-e-diretivas)
  - [5. Refatoração para Models e Services](#-interface-model)
  - [6. Implementando Roteamento](#-rotas)
  - [7. Trabalhando com Formulários Reativos (Reactive Forms)](#-iniciando-reactive-forms)
</details>

---

## ⚙️ Parte 1: Construindo o Backend com .NET

### 1. Criando a Solução
🎯 **Objetivo:** Estruturar a solução e os projetos em camadas (`Domain`, `Persistence`, `Application`).

1.  **📄 Criar o arquivo de solução (`.sln`):**
    ```bash
    dotnet new sln -n ProEvento
    ```
2.  **🧱 Criar as bibliotecas de classe (camadas):**
    ```bash
    dotnet new classlib -n Domain
    dotnet new classlib -n Persistence
    dotnet new classlib -n Application
    ```
3.  **🔗 Adicionar as camadas à solução:**
    ```bash
    dotnet sln ProEvento.sln add Domain/
    dotnet sln ProEvento.sln add Persistence/
    dotnet sln ProEvento.sln add Application/
    ```
4.  **✅ Compilar para verificar a estrutura:**
    ```bash
    dotnet build
    ```

### 2. Iniciando a estrutura do Domain
🎯 **Objetivo:** Definir as entidades (modelos) que representarão as tabelas do banco de dados.

<details>
  <summary>Ver código das Entidades</summary>
  
  #### Evento.cs
  ```csharp
  namespace Domain.entities
  {
      public class Evento
      {
          public int Id { get; set; }     
          public string Local { get; set; }
          public string Tema { get; set; }
          public DateTime? dataEvento { get; set; }
          public int QtdPessoas { get; set; }
          public string ImagemURL { get; set; }
          public string Telefone { get; set; }
          public string Email { get; set; }
          public IEnumerable<Lote> Lotes { get; set; } = new List<Lote>();
          public IEnumerable<RedeSocial> RedesSociais { get; set; } = new List<RedeSocial>();
          public IEnumerable<EventoPalestrante> EventosPalestrantes { get; set; } = new List<EventoPalestrante>();
      }
  }
  ```
  #### Lote.cs
  ```csharp
  namespace Domain.entities
  {
      public class Lote { /* ... */ }
  }
  ```
  #### RedeSocial.cs
  ```csharp
  namespace Domain.entities
  {
      public class RedeSocial { /* ... */ }
  }
  ```
  #### Palestrante.cs
  ```csharp
  namespace Domain.entities
  {
      public class Palestrante { /* ... */ }
  }
  ```
  #### EventoPalestrante.cs (Tabela de Junção)
  ```csharp
  namespace Domain.entities
  {
      public class EventoPalestrante { /* ... */ }
  }
  ```
</details>

### 3. Criando Persistencia
🎯 **Objetivo:** Configurar o acesso a dados com Entity Framework Core.

1.  **🔗 Adicionar referência do `Domain` na `Persistence`:**
    ```bash
    dotnet add ./Persistence reference ./Domain
    ```
2.  **📦 Instalar pacotes NuGet necessários na camada `Persistence`:**
    ```xml
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="7.0.5" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="7.0.5" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="7.0.5" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite" Version="7.0.5" />
    ```

### 4. Criando Camada de Aplicação
🎯 **Objetivo:** Implementar o `DbContext`, os contratos (interfaces) e os repositórios.

1.  **🗃️ Criar o `DbContext`:**
    - Crie a pasta `Persistence/Context`.
    - Crie a classe `ProEventoContext` herdando de `DbContext` e adicione os `DbSet<>` para cada entidade.
2.  **📜 Criar as Interfaces de Contrato (Padrão Repositório):**
    - Crie a pasta `Persistence/Contracts`.
    - Defina as interfaces `IGeralPersist`, `IEventoPersist`, `IPalestrantePersist`.
3.  **✍️ Implementar os Repositórios:**
    - Crie a pasta `Persistence/Repositories`.
    - Crie as classes `GeralPersist`, `EventoPersist` e `PalestrantePersist` que implementam as interfaces correspondentes.

### 5. FluenteAPI
🎯 **Objetivo:** Configurar o mapeamento das entidades para o banco de dados de forma explícita e organizada.

1.  **⚙️ Configurar `OnModelCreating` no `ProEventoContext`:**
    ```csharp
    protected override void OnModelCreating(ModelBuilder modelBuilder) 
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
    ```
2.  **📝 Criar as classes de configuração:**
    - Crie a pasta `Persistence/Configurations`.
    - Para cada entidade, crie uma classe de configuração (ex: `EventoConfiguration.cs`) que implementa `IEntityTypeConfiguration<T>`.

### 6. Application
🎯 **Objetivo:** Criar a lógica de negócio, DTOs e serviços.

1.  **🔗 Adicionar referências na camada `Application`:**
    ```bash
    dotnet add ./Application reference ./Domain
    dotnet add ./Application reference ./Persistence
    ```
2.  **📦 Instalar AutoMapper:**
    ```xml
    <PackageReference Include="AutoMapper.Extensions.Microsoft.DependencyInjection" Version="12.0.1" />
    ```
3.  **📋 Criar DTOs (Data Transfer Objects):**
    - Crie a pasta `Application/DTOs`.
    - Defina as DTOs (ex: `EventoDTO.cs`) com validações de dados (`DataAnnotations`).
4.  **🗺️ Configurar o AutoMapper:**
    - Crie a pasta `Application/Helpers`.
    - Crie a classe `ProEventosProfile.cs` herdando de `Profile` para configurar os mapeamentos entre Entidades e DTOs.
5.  **📜 Criar Contratos de Serviço:**
    - Crie a pasta `Application/Contracts`.
    - Defina as interfaces dos serviços (ex: `IEventoService.cs`).
6.  **✍️ Implementar os Serviços:**
    - Crie a pasta `Application/Services`.
    - Crie as classes de serviço (ex: `EventoService.cs`) que implementam as interfaces e orquestram a lógica, utilizando os repositórios.

### 7. API
🎯 **Objetivo:** Expor a lógica de negócio através de endpoints HTTP.

1.  **🏗️ Criar o projeto Web API:**
    ```bash
    dotnet new webapi -n ProEvento.API
    ```
2.  **🔗 Adicionar referências e adicionar à solução:**
    ```bash
    dotnet sln ProEvento.sln add ./API/
    dotnet add ./API/ reference ./Application/
    ```
3.  **🔧 Configurar `Program.cs`:**
    - Injeção de dependência para os serviços e repositórios.
    - Configuração do `DbContext` (ex: com SQLite).
    - Configuração do AutoMapper e CORS.
4.  **🎮 Criar os Controllers:**
    - Crie a pasta `API/Controllers`.
    - Crie os controllers (ex: `EventoController.cs`) para definir os endpoints (GET, POST, PUT, DELETE).
5.  **🌱 Criar e aplicar as Migrations:**
    ```bash
    dotnet ef migrations add InitialCreate -p ./Persistence/ -s ./API/
    dotnet ef database update -s ./API/
    ```

### 8. Autenticação JWT
🎯 **Objetivo:** Proteger a API com autenticação baseada em token usando ASP.NET Identity.

1.  **📦 Instalar pacotes do Identity:**
    ```xml
    <PackageReference Include="Microsoft.AspNetCore.Identity.EntityFrameworkCore" Version="7.0.5" />
    <PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="7.0.5" />
    ```
2.  **👤 Customizar as Entidades do Identity:**
    - Na camada `Domain`, crie as classes `User`, `Role` e `UserRole` herdando das classes base do Identity, especificando `int` como tipo da chave.
3.  **⚙️ Atualizar o `DbContext`:**
    - Mude a herança de `DbContext` para `IdentityDbContext<...>` com os tipos customizados.
4.  **🔑 Configurar o JWT em `Program.cs`:**
    - Adicione a configuração do Identity Core (`AddIdentityCore`).
    - Adicione a configuração da autenticação JWT (`AddAuthentication` e `AddJwtBearer`), definindo os parâmetros de validação do token e a chave secreta (lida do `appsettings.json`).
5.  **✍️ Implementar `AccountService` e `TokenService`:**
    - Crie os serviços para gerenciar contas de usuário (registrar, logar) e para criar os tokens JWT.
6.  **🎮 Criar `AccountController`:**
    - Crie os endpoints para `Registrar`, `Login` e `GetUser`. Use `[AllowAnonymous]` para as rotas públicas.
7.  **🔒 Proteger os Endpoints:**
    - Adicione o atributo `[Authorize]` nos controllers ou endpoints que precisam de autenticação.

---

## 🎨 Parte 2: Construindo o Frontend com Angular

### 🧰 1. Instalação de Dependências Iniciais
```bash
# Instalar Angular CLI globalmente
npm install -g @angular/cli
```

### 🚀 3. Criação e Configuração Inicial do Projeto Angular
```bash
# Criar novo projeto com Roteamento e SCSS
ng new ProEventos-App --routing --style=scss
```

### 🏗️ 5. Criação de Componentes
```bash
# Gerar componentes principais
ng g c components/eventos
ng g c components/palestrantes
ng g c shared/nav
```

### 🌐 7. Integração com API via HttpClient
1.  **📦 Importar `HttpClientModule` em `app.module.ts`:**
    ```typescript
    import { HttpClientModule } from '@angular/common/http';

    @NgModule({
      imports: [ /*...,*/ HttpClientModule ],
    })
    ```
2.  **📞 Fazer a chamada HTTP no componente:**
    - Injetar `HttpClient` e usar o método `.get()` para buscar os dados da API.

### 🎨 8. Instalação de FontAwesome e NGX-Bootstrap
1.  **🖼️ FontAwesome:**
    ```bash
    npm install --save @fortawesome/fontawesome-free
    ```
2.  **🧩 NGX Bootstrap:**
    ```bash
    ng add ngx-bootstrap
    ```
3.  **💅 Importar os estilos em `styles.scss`:**
    ```scss
    @import "../node_modules/bootstrap/scss/bootstrap";
    @import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
    @import "node_modules/ngx-bootstrap/datepicker/bs-datepicker";
    ```

### 🔄 10. Interpolação e Diretivas
- **Two-way Data Binding (`[(ngModel)]`):** Para criar um filtro de busca dinâmico, importe `FormsModule` em `app.module.ts` e use `[(ngModel)]="filtroLista"` no `input`.
- **Diretivas Estruturais (`*ngFor`, `*ngIf`):** Para renderizar a lista de eventos e mostrar uma mensagem caso a lista esteja vazia.

### 🧩 Interface Model
- **📂 Criar a pasta `src/app/models`**.
- **📝 Definir interfaces TypeScript** (`Evento.ts`, `Lote.ts`, etc.) para tipar os dados recebidos da API, garantindo segurança e auxílio do editor.

### 🛠️ Gerando Service
- **📂 Criar a pasta `src/app/services`**.
- **⚙️ Gerar o serviço de eventos:**
  ```bash
  ng g s services/evento
  ```
- **🚚 Mover a lógica de chamada HTTP** do componente para o `EventoService`, mantendo os componentes mais limpos.
- **💉 Injetar o serviço** no `app.module.ts` (em `providers`) para que esteja disponível globalmente.

### 🗺️ Rotas
- **🔗 Usar `routerLink` na `nav.component.html`** para criar links de navegação.
- **⚙️ Configurar as rotas em `app-routing.module.ts`**, incluindo rotas aninhadas (filhas) para gerenciar a lista e os detalhes dos eventos.
  ```typescript
  // Exemplo de rota aninhada
  { 
    path: 'eventos', component: EventosComponent, 
    children: [
      { path: 'detalhes/:id', component: EventoDetalheComponent },
      { path: 'lista', component: EventoListaComponent }
    ]
  },
  ```

### 📜 Iniciando Reactive Forms
- **📦 Importar `ReactiveFormsModule` em `app.module.ts`**.
- **✍️ Em `evento-detalhe.component.ts`:**
    - Injetar `FormBuilder`.
    - Criar uma propriedade `form: FormGroup`.
    - Definir a estrutura do formulário e as validações (`Validators.required`, `Validators.minLength`, etc.).
- **📝 Em `evento-detalhe.component.html`:**
    - Associar o formulário com `[formGroup]="form"`.
    - Associar cada campo com `formControlName="..."`.
    - Exibir mensagens de erro com base no estado do formulário (`f.campo.errors` e `f.campo.touched`).
- **✅ Criar Validadores Customizados** (ex: `passwordMatch`) para lógicas de validação mais complexas.
