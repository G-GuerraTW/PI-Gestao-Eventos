# Evento Fácil: Plataforma de Gestão de Eventos
## Projeto Integrador UNIVESP | Full Stack .NET + Angular

O **Evento Fácil** é uma **plataforma web Full Stack** desenvolvida para **simplificar a organização e a gestão de eventos** em um local específico. Atua como um portal central para a administração do local e um ponto de interação para participantes e palestrantes.

| Funcionalidades-Chave | Stack Principal |
| :--- | :--- |
| ✅ Gestão Completa de Eventos (CRUD). | **Backend:** ASP.NET 7+ (C#) |
| ✅ Autenticação Segura (Identity & JWT). | **Frontend:** Angular 17+ (TypeScript) |
| ✅ Listagem Pública de Programação. | **ORM:** Entity Framework Core |

---

## 🗺️ Arquitetura e Estrutura

### ⚙️ Backend: ASP.NET Core em Camadas
A API segue o princípio da **Separação de Preocupações (SoC)**, adotando uma arquitetura em camadas para escalabilidade e manutenção.

| Camada | Objetivo | Foco Técnico |
| :--- | :--- | :--- |
| **Domain** | Modelos e Regras de Negócio. | Entidades de Negócio (`Evento`, `User`, `Palestrante`). |
| **Persistence** | Acesso a Dados (A-D). | Padrão Repositório, EF Core, Fluent API (Mapeamento DB). |
| **Application** | Lógica de Negócio (L-N). | DTOs (AutoMapper), Contratos de Serviço (Interface de L-N). |
| **API** | Pontos de Entrada HTTP. | Controllers (Endpoints REST), Injeção de Dependência, Configuração JWT. |

**Segurança:** A autenticação é gerenciada pelo **ASP.NET Identity** e a autorização utiliza **JWT** (JSON Web Tokens), protegendo as rotas que exigem login.

### 🎨 Frontend: Angular (Single Page Application - SPA Reativa)
O frontend é construído com Angular, promovendo modularidade e alta performance com foco em experiência de usuário.

| Módulo/Conceito | Detalhamento da Implementação |
| :--- | :--- |
| **Componentes & Services** | Uso do **Padrão Service** para isolar a comunicação com a API REST (`HttpClient`). Os Services contêm a lógica de chamada de dados, mantendo os Componentes dedicados apenas à View. |
| **TypeScript e Models** | Tipagem forte dos dados recebidos da API através de interfaces (Models como `Evento.ts`), garantindo a segurança de tipos e melhor auxílio do editor. |
| **Reactive Forms** | Implementação de formulários utilizando a abordagem reativa (`FormGroup`, `FormBuilder`), facilitando validações complexas e customizadas (ex: confirmação de senha). |
| **Roteamento** | Configuração do `app-routing.module.ts` para navegação fluida de **SPA**, incluindo rotas aninhadas e rotas parametrizadas (`/eventos/detalhes/:id`). |
| **Bibliotecas UI** | Utilização de **Bootstrap** e **NGX-Bootstrap** (para modais/calendários) para agilizar o desenvolvimento da interface e garantir responsividade. |

---

## 🚀 Guia de Configuração e Execução

Para rodar o projeto localmente, siga os passos abaixo para as duas aplicações:

### 1. Backend (API):
Execute no diretório da solução ou do projeto `API`.

```bash
# 1. Aplica as Migrations e cria/atualiza o banco de dados (SQLite por padrão)
dotnet ef database update -s ./API/

# 2. Inicia o servidor da API (acesso em http://localhost:5000)
dotnet watch run --project ./API/
```

### 2. Frontend (Angular):
Execute no diretório do projeto Angular (EventoFacil-App).
```bash
# 1. Instala todas as dependências do Node (incluindo Angular, TypeScript, etc.)
npm install

# 2. Inicia o servidor de desenvolvimento (acesso em http://localhost:4200)
ng serve -o
```
