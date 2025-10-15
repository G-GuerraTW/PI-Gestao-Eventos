## Entity Framework & Identity

#### Está documentação é um passo a passo de como criar uma aplicação com  framework core, Entity e Identity. este documento sera uma forma linear de explicação, então siga da maneira que ele foi escrito.

---

### 1. Criando a Solução

1. Execute o comando para criar o arquivo de solução, 
```
dotnet new sln -n ProEvento
```

2. após isso iremos criar as classlib que seria as camadas do projeto, iniciando pela Domain, Persistence, Application, utilizando do comando  
```
dotnet new classlib -n "nome da lib"
```
3. após criar as camadas iremos adicionar as classlib para a solução **ProEvento** faça isso com todas classlib com o comando: 
```
dotnet sln "nome solução" add "classlib"
```
4. logo após execute um o comando abaixo para compilar o projeto e ter certeza que está tudo certo:
```
dotnet build
```
---
### 2. Iniciando a estrutura do Domain

1. inicialmente iremos criar um diretorio chamado Entities que seria as entidades "Tabelas" que o sistema ira ter, e dentro de Entities iremos criar as classes que representara as tabelas do banco, abaixo esta os exemplos das entiidades utilizada neste projeto:

**Evento**
```csharp
using System.ComponentModel;

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
        IEnumerable<Lote> Lotes { get; set; } = new List<Lote>();
        IEnumerable<RedeSocial> RedesSociais = new List<RedeSocial>();
        IEnumerable<EventoPalestrante> EventosPalestrantes = new List<EventoPalestrante>();
    }
}
```
**Lote**
```csharp
namespace Domain.entities
{
    public class Lote
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public DateTime? DataInicio { get; set; }
        public DateTime? DataFim { get; set; }
        public decimal Valor { get; set; }
        public int Quantidade { get; set; }
        public int EventoId { get; set; }
        public Evento Evento { get; set; }
    }
}
```
**Rede Social**
```csharp
namespace Domain.entities
{
    public class RedeSocial
    {
        public int Id { get; set; }        
        public string Nome { get; set; }
        public string URL { get; set; }
        public int? EventoId { get; set; }
        public Evento Evento { get; set; }
        public int? PalestranteId { get; set; }
        public Palestrante Palestrante { get; set; }
    }
}
```
**Palestrante**
```csharp
namespace Domain.entities
{
    public class Palestrante
    {
        public int Id { get; set; }        
        public string Nome { get; set; }
        public string MiniCurriculo { get; set; }
        public IEnumerable<RedeSocial> RedesSociais { get; set; } = new List<RedeSocial>();
        public IEnumerable<EventoPalestrante> EventosPalestrantes { get; set; } = new List<EventoPalestrante>();
    }
}
```
**EventoPalestrante** está entidade é uma entidade relacional entre Evento e Palestrante pois Palestrante pode participar de muitos eventos e um Evento pode ter muitos palestrantes, então temos um relacionamento composto.
```csharp
namespace Domain.entities
{
    public class EventoPalestrante
    {
        public int EventoId { get; set; }        
        public Evento Evento { get; set; }
        public int PalestranteId { get; set; }
        public Palestrante Palestrante { get; set; }
    }
}
```
#### Tendo as entidades iniciais prontas podemos partir para a persistencia e criar sua estrutura utilizando das entidades do dominio.

---

### 3. Criando Persistencia,

Logo apos criarmos as entidades do dominio poderemos começar a estruturar a **Persistencia** lembrando que como iremos utilizar das entidades que estão no dominio dentro da persistencia precisaremos inicialmente fazer a referencia da classlib do dominio dentro da classlib de Persistencia com o comando abaixo:
```csharp
dotnet add "sua camada alvo" reference "sua camada referencia"
dotnet add ./Persistence reference ./Domain
```
Agora iremos nos atentar ao arquivos Persistence.csproj no qual iremos adicionar os pacotes necessarios para Criar nosso Contexto e para isos iremos utilizar o NuGet Package Manager e adicionaremos os seguintes pacotes:
```csharp
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="9.0.0" /> |
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="9.0.0">
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="9.0.0">
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="9.0.0"/>
    <PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite" Version="9.0.0" />
```
lembrando que o Package de banco de dados vc deve decidir qual irá utilizar.

**Microsoft.EntityFrameworkCore**:
Fornece funcionalidades principais para o Entity Framework Core.

**Microsoft.EntityFrameworkCore.** Design:
Suporte a ferramentas para desenvolvimento com EF Core.

**Microsoft.EntityFrameworkCore.** Tools:
Ferramentas CLI para comandos do EF Core, como migrações.

**Microsoft.EntityFrameworkCore.SqlServer**:
Permite uso do SQL Server como provedor de banco no EF Core.

---

### 4. Criando Camada de Aplicação

proximo passo é criar o contexto da aplicação, tanto repositorio como classe,

1. crie uma pasta chamada **Context** dentro da camada Persistence.
    1. criar uma nova classe chamada ProEventoContext.
 dentro dela teremos um codigo como este no momento:
    ```csharp
    using Domain.entities;
    using Microsoft.EntityFrameworkCore;

    namespace Persistence.Context
    {
        public class ProEventoContext : DbContext
        {
            public ProEventoContext(DbContextOptions<ProEventoContext> options) : base(options) { }

            public DbSet<Evento> Eventos { get; set; } 
            public DbSet<Lote> Lotes { get; set; }
            public DbSet<RedeSocial> RedesSociais { get; set; }
            public DbSet<Palestrante> Palestrantes { get; set; }
            public DbSet<EventoPalestrante> EventosPalestrantes { get; set; }
        }
    }
    ```
2. Gerar as Interfaces de contrato, agora iremos criar o diretório chamado **Contracts** e dentro dela gerar os seguintes arquivos com os código que estão listado a baixo.

    1. **/Contracts/** gere as Interfaces **IGeralPersistence, IEventoPersistence, IPalestrantePersistence**

    2. **IGeralPersist**
    ```csharp
        using System;
        using System.Collections.Generic;
        using System.Linq;
        using System.Threading.Tasks;

        namespace Persistence.Contracts
        {
            public interface IGeralPersist
            {
                void Add<T>(T entity)where T : class;
                void Update<T>(T entity)where T : class;
                void Delete<T>(T entity) where T : class;
                void DeleteRange<T>(T[] entity) where T : class;
                Task <bool> SaveChangesAsync();
            }
        }
    ```
    3. **IEventoPersist**
    ```csharp
        using Domain.entities;
        using Microsoft.Identity.Client;

        namespace Persistence.Contracts
        {
            public interface IEventoPersist
            {
                public Task<Evento[]> GetAllEventosAsync(bool IncludePalestrante = false);
                public Task<Evento[]> GetAllEventosByTemaAsync( string Tema,bool IncludePalestrante = false);
                public Task<Evento> GetEventoByIdAsync(string Id, bool IncludePalestrante = false);
            }
        }
    ```
    4. **IPalestrantePersist**
    ```csharp
        using Domain.entities;

        namespace Persistence.Contracts
        {
            public interface IPalestrantePersist
            {
                public Task<Palestrante[]> GetAllPalestrantesAsync(bool IncludeEvento = false);
                public Task<Palestrante[]> GetAllPalestrantesByNameAsync(string Name, bool IncludeEvento = false);
                public Task<Palestrante> GetPalestranteByIdAsync(int Id, bool IncludeEvento = false);
            }
        }
    ```
3. logo após criar o diretorio de contratos e criar as interfaces de contratos iremos iniciar o diretorio **Repositories** no qual ira ficar as classes que irão assinar as interfaces dos contratos da persistencia, para cada interface criada gere agora uma nova classe com os seugintes nomes e adicione o codigo listado a baixo a cada arquivo, **GeralPersist**, **EventoPersist**, **PalestrantePersist**

    1. **GeralPersist**
    ```csharp
    using Persistence.Context;
    using Persistence.Contracts;
    
    namespace Persistence.Repositories
    {
        public class GeralPersist : IGeralPersist
        {
            private readonly ProEventoContext context;
            public GeralPersist(ProEventoContext context)
            {
                this.context = context;
            }
    
            public void Add<T>(T entity) where T : class
            {
                context.Add(entity);
            }
    
            public void Update<T>(T entity) where T : class
            {
                context.Update(entity);
            }
    
            public void Delete<T>(T entity) where T : class
            {
                context.Remove(entity);
            }
    
            public void DeleteRange<T>(T[] entity) where T : class
            {
                context.RemoveRange(entity);
            }
    
            public async Task<bool> SaveChangesAsync()
            {
                return (await context.SaveChangesAsync()) > 0;
            }
        }
    }
    ```
    2. **EventoPersist**
    ```csharp
    using Domain.entities;
    using Persistence.Context;
    using Persistence.Contracts;
    using Microsoft.EntityFrameworkCore;

    namespace Persistence.Repositories
    {
        public class EventoPersist : IEventoPersist
        {
            public ProEventoContext context { get; }
            public EventoPersist(ProEventoContext context)
            {
                this.context = context;
            }

            public async Task<Evento[]> GetAllEventosAsync(bool IncludePalestrante = false)
            {
                IQueryable<Evento> query = Context.Eventos.Include(E => E.Lotes).Include(E => E.RedesSociais).AsNoTracking();

                if(IncludePalestrante) query = query.Include(E => E.EventosPalestrantes).ThenInclude(EP => EP.Evento);

                return await query.ToArrayAsync();
            }

            public async Task<Evento[]> GetAllEventosByTemaAsync(string Tema, bool IncludePalestrante = false)
            {
                IQueryable<Evento> query = Context.Eventos.Include(E => E.Lotes).Include(E => E.RedesSociais).AsNoTracking();

                if(IncludePalestrante) query = query.Include(E => E.EventosPalestrantes).ThenInclude(EP => EP.Evento);

                query = query.Where(E => E.Tema == Tema);

                return await query.ToArrayAsync();
            }

            public async Task<Evento> GetEventoByIdAsync(int Id, bool IncludePalestrante = false)
            {
                IQueryable<Evento> query = Context.Eventos.Include(E => E.Lotes).Include(E => E.RedesSociais).AsNoTracking();

                if(IncludePalestrante) query = query.Include(E => E.EventosPalestrantes).ThenInclude(EP => EP.Evento);

                query = query.Where(E => E.Id == Id);

                return await query.FirstOrDefaultAsync();
            }
        }
    }
    ```
    3. **PalestrantePersist**
    ```csharp
    using Domain.entities;
    using Persistence.Context;
    using Persistence.Contracts;
    using Microsoft.EntityFrameworkCore;

    namespace Persistence.Repositories
    {
        public class PalestrantePersist : IPalestrantePersist
        {
            private readonly ProEventoContext context;
            public PalestrantePersist(ProEventoContext context)
            {
                this.context = context;
            }
            public async Task<Palestrante[]> GetAllPalestrantesAsync(bool IncludeEvento = false)
            {
                IQueryable<Palestrante> query = context.Palestrantes.Include(P => P.RedesSociais).AsNoTracking();

                if(IncludeEvento) query = query.Include(P => P.EventosPalestrantes).ThenInclude(EP => EP.Palestrante);

                return await query.ToArrayAsync();
            }

            public async Task<Palestrante[]> GetAllPalestrantesByNameAsync(string Name, bool IncludeEvento = false)
            {
                IQueryable<Palestrante> query = context.Palestrantes.Include(P => P.RedesSociais).AsNoTracking();

                if(IncludeEvento) query = query.Include(P => P.EventosPalestrantes).ThenInclude(EP => EP.Palestrante);

                query = query.Where(P => P.Nome == Name);

                return await query.ToArrayAsync();
            }

            public async Task<Palestrante> GetPalestranteByIdAsync(int Id, bool IncludeEvento = false)
            {
                IQueryable<Palestrante> query = context.Palestrantes.Include(P => P.RedesSociais).AsNoTracking();

                if(IncludeEvento) query = query.Include(P => P.EventosPalestrantes).ThenInclude(EP => EP.Palestrante);

                query = query.Where(P => P.Id == Id);

                return await query.FirstOrDefaultAsync();
            }
        }
    }
    ```
---

### 5. FluenteAPI

#### Aproveitando que finalizamos a primeira parte da persistencia iremos ja adicionar a configuração do FluenteAPI manualmente, isso nos dara um total controle de como queremos que as tabelas e as propriedades se comportem no banco de dados.

1. Iniciaremos adicionanado o trecho de código abaixo para o Entity procurar dentro de nossa persistencia todas classes que herdam de IEntityTypeConfiguration para dar override e adicionar as configurações do fluenteAPI apartir de outros arquivos, faremos isso para ter uma estrutura mais limpa e organizada, então dentro do repositorio Persistence criaremos uma nova pasta chamada Configurations e dentro dela teremos as classes por exemplo EventoConfiguration.cs e nela tera a configuração de maneira isolada de apenas aquela classe no qula o nome da diz.

2. adicionemos o trecho de código abaixo no arquivo Persistence/Context/ProEventoContext.cs
    ```csharp
    using Domain.entities;
    using System.Reflection;
    using Microsoft.EntityFrameworkCore;

    namespace Persistence.Context
    {
        public class ProEventoContext : DbContext
        {
            public ProEventoContext(DbContextOptions<ProEventoContext> options) : base(options) { }
            public DbSet<Evento> Eventos { get; set; } 
            public DbSet<Lote> Lotes { get; set; }
            public DbSet<RedeSocial> RedesSociais { get; set; }
            public DbSet<Palestrante> Palestrantes { get; set; }
            public DbSet<EventoPalestrante> EventosPalestrantes { get; set; }

            protected override void OnModelCreating(ModelBuilder modelBuilder) 
            {
                base.OnModelCreating(modelBuilder);
                modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            }
        }
    }
    ```
3. notamos que nesta parte do código a intrução que foi adicionada foi o **Protected Override** e na parte superior adicionamos o System.Reflections.
4. Agora criaremos nossa classe de configuração do FluenteAPI, abaixo estara listada o nome de cada classe e o conteudo:
    1. **EventoConfiguration.cs**
    ```csharp
    using Domain.entities;
    using Microsoft.EntityFrameworkCore;

    namespace Persistence.Configurations
    {
        public class EventoConfiguration : IEntityTypeConfiguration<Evento>
        {
            public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Evento> builder)
            {
                builder.ToTable("Evento");
                builder.HasKey(E => E.Id);
                builder.Property(E => E.Local).HasColumnType("VARCHAR(200)");
                builder.Property(E => E.Tema).HasColumnType("VARCHAR(200)");
                builder.Property(E => E.DataEvento).HasColumnType("DATETIME()");
                builder.Property(E => E.QtdPessoas).HasColumnType("INT(4)");
                builder.Property(E => E.ImagemURL).HasColumnType("VARCHAR(400)");
                builder.Property(E => E.Telefone).HasColumnType("VARCHAR(20)");
                builder.Property(E => E.Email).HasColumnType("VARCHAR(100)");

                builder.HasMany(E => E.Lotes)
                    .WithOne(L => L.Evento)
                    .HasForeignKey(L => L.EventoId)
                    .IsRequired(false)
                    .OnDelete(DeleteBehavior.Cascade);

                builder.HasMany(E => E.RedesSociais)
                    .WithOne(R => R.Evento)
                    .HasForeignKey(R => R.EventoId)
                    .IsRequired(false)
                    .OnDelete(DeleteBehavior.Cascade);

                builder.HasMany(E => E.EventosPalestrantes)
                    .WithOne(EP => EP.Evento)
                    .HasForeignKey(EP => EP.EventoId)
                    .IsRequired(false)
                    .OnDelete(DeleteBehavior.Cascade);
            }
        }
    }
    ```
    2. **LoteConfiguration.cs**
     ```csharp
    using Domain.entities;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    namespace Persistence.Configurations
    {
        public class LoteConfiguration : IEntityTypeConfiguration<Lote>
        {

            public void Configure(EntityTypeBuilder<Lote> builder)
            {
                builder.ToTable("Lote");
                builder.HasKey(L => L.Id);
                builder.Property(L => L.Nome).HasColumnType("VARCHAR()");
                builder.Property(L => L.DataInicio).HasColumnType("DATETIME()");
                builder.Property(L => L.DataFim).HasColumnType("DATETIME()");
                builder.Property(L => L.Valor).HasColumnType("DECIMAL()");
                builder.Property(L => L.Quantidade).HasColumnType("INTEGER()");

                builder.HasOne(L => L.Evento)
                .WithMany(E => E.Lotes)
                .HasForeignKey(L => L.EventoId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            }
        }
    }
    ```

    3. **RedeSocialConfiguration.cs**
     ```csharp
    using Domain.entities;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    namespace Persistence.Configurations
    {
        public class LoteConfiguration : IEntityTypeConfiguration<Lote>
        {

            public void Configure(EntityTypeBuilder<Lote> builder)
            {
                builder.ToTable("Lote");
                builder.HasKey(L => L.Id);
                builder.Property(L => L.Nome).HasColumnType("VARCHAR()");
                builder.Property(L => L.DataInicio).HasColumnType("DATETIME()");
                builder.Property(L => L.DataFim).HasColumnType("DATETIME()");
                builder.Property(L => L.Valor).HasColumnType("DECIMAL()");
                builder.Property(L => L.Quantidade).HasColumnType("INTEGER()");

                builder.HasOne(L => L.Evento)
                .WithMany(E => E.Lotes)
                .HasForeignKey(L => L.EventoId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            }
        }
    }
    ```

    4. **PalestarnteConfigurations.cs**
     ```csharp
    using Domain.entities;
    using Microsoft.EntityFrameworkCore;

    namespace Persistence.Configurations
    {
        public class PalestranteConfiguration : IEntityTypeConfiguration<Palestrante>
        {
            public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Palestrante> builder)
            {
                builder.ToTable("Palestrante");
                builder.HasKey(P => P.Id);
                builder.Property(P => P.Nome).HasColumnType("VARCHAR(150)");
                builder.Property(P => P.MiniCurriculo).HasColumnType("VARCHAR(600)");

                builder.HasMany(P => P.RedesSociais)
                .WithOne(R => R.Palestrante)
                .HasForeignKey(R => R.PalestranteId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Cascade);

                builder.HasMany(P => P.EventosPalestrantes)
                .WithOne(EP => EP.Palestrante)
                .HasForeignKey(EP => EP.PalestranteId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Cascade);

            }
        }
    }
    ```
    5. **EventoPalestranteConfiguration.cs**
     ```csharp
    using Domain.entities;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    namespace Persistence.Configurations
    {
        public class EventoPalestranteConfiguration : IEntityTypeConfiguration<EventoPalestrante>
        {
            public void Configure(EntityTypeBuilder<EventoPalestrante> builder)
            {
                builder.HasKey(EP => new { EP.EventoId, EP.PalestranteId });

                builder.HasOne(EP => EP.Evento)
                .WithMany(E => E.EventosPalestrantes)
                .HasForeignKey(EP => EP.EventoId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

                builder.HasOne(EP => EP.Palestrante)
                .WithMany(E => E.EventosPalestrantes)
                .HasForeignKey(EP => EP.PalestranteId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            }
        }
    }
    ```
---

### 6. Application

#### Agora partiremos para application com o intuito de criar também as Interfaces de serviço, o serviço e também as DTOs para termos um controle nos objetos de retorno para o cliente, nela também faremos assinaturas das interfaces que está presente na Persistencia e utilizaremos de entidades do dominio, então inicialmente iremos adicionar referencia das outras classlib para ela.

1. Inicialmente iremos adicionar referencias das classlib de **Persistencia** e **Domain** para a nossa **Application**, siga com o comando abaixo
    ```csharp
    dotnet add .\Application\ reference .\Domain\
    dotnet add .\Application\ reference .\Persistence\
     ```
2. Iremos adicionar agora a lib para suportar as DTOs dentro da nossa camada de application, adicione o seguinte pacote:
    ```csharp
    <PackageReference Include="AutoMapper.Extensions.Microsoft. DependencyInjection" Version="12.0.1" />
    ```

3. Criar Diretório DTOs e Helpers, para iniciar a integração da lib DTO em nosso projeto assim podemos tratar os objetos para retornar apenas o necessario para o cliente e não todas as informações contidas neles.

4. Iniciaremos criando as DTOs, como está abaixo: Application/DTOs/

    1.  **EventoDTO.cs**
    ```csharp
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    namespace ProEventos.Application.Dtos
    {
        public class EventoDTO
        {
            public int Id { get; set; }
            public string Local { get; set; }
            public string DataEvento { get; set; }

            [Required(ErrorMessage = "O campo {0} é obrigtório."),
             //MinLength(3, ErrorMessage = "{0} deve ter no mínimo 4 caracteres."),
             //MaxLength(50, ErrorMessage = "{0} deve ter no máximo 50 caracteres.")
             StringLength(50, MinimumLength = 3,
                              ErrorMessage = "Intervalo permitido de 3 a 50 caracteres.")]
            public string Tema { get; set; }


            [Display(Name = "Qtd Pessoas")]
            [Range(1, 120000, ErrorMessage = "{0} não pode ser menor que 1 e maior que 120.000")]
            public int QtdPessoas { get; set; }

            [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$",
                               ErrorMessage = "Não é uma imagem válida. (gif, jpg, jpeg, bmp ou png)")]
            public string ImagemURL { get; set; }

            [Required(ErrorMessage = "O campo {0} é obrigatório")]
            [Phone(ErrorMessage = "O campo {0} está com número inválido")]
            public string Telefone { get; set; }

            [Required(ErrorMessage = "O campo {0} é obrigatório")]
            [Display(Name = "e-mail")]
            [EmailAddress(ErrorMessage = "É necessário ser um {0} válido")]
            public string Email { get; set; }

            public int UserId { get; set; }
            public UserDto UserDto { get; set; }

            public IEnumerable<LoteDto> Lotes { get; set; } = new List<LoteDTo>();
            public IEnumerable<RedeSocialDto> RedesSociais { get; set; } = new List<RedeSocialDto>();
            public IEnumerable<PalestranteDto> Palestrantes { get; set; } = new List<PalestranteDto>();
        }
    }
    ```
    2. **LoteDTO.cs**
    ```csharp
    namespace ProEventos.Application.Dtos
    {
        public class LoteDTO
        {
            public int Id { get; set; }
            public string Nome { get; set; }
            public decimal Preco { get; set; }
            public string DataInicio { get; set; }
            public string DataFim { get; set; }
            public int Quantidade { get; set; }
            public int EventoId { get; set; }
            public EventoDto EventoDto { get; set; }
        }
    }
    ```
    3. **RedeSocialDTO.cs**
    ```csharp
    namespace Application.DTOs
    {
        public class RedeSocialDTO
        {
                public int Id { get; set; }
                public string Nome { get; set; }
                public string URL { get; set; }
                public int? EventoId { get; set; }
                public EventoDTO? Evento { get; set; }
                public int? PalestranteId { get; set; }
                public PalestranteDTO? Palestrante { get; set; }        
        }
    }
    ```
    4. **PalestranteDTO.cs**
    ```csharp
    using Domain.entities;
    namespace Application.DTOs
    {
        public class PalestranteDTO
            {
                public int Id { get; set; }        
                public string Nome { get; set; }
                public string MiniCurriculo { get; set; }
                public int UserId { get; set; }
                public IEnumerable<RedeSocialDTO>? RedesSociais { get; set; } = new List<RedeSocialDTO>();
                public IEnumerable<EventoPalestrante>? EventosPalestrantes { get; set; } = new List<EventoPalestrante>();
            }
    }
    ```

5. Agora iremos configurar o Helpers para mapear a qual Entidades as DTOs irão apontar, segue a configuração dos arquivos no diretório: Application/Helpers:

    1. **ProEventosProfile.cs**
    ```csharp
    using AutoMapper;
    using ProEventos.Domain.Entities; // Namespace da entidade Evento
    using ProEventos.Application.Dtos; // Namespace do DTO EventoDto
    
    namespace ProEventos.API.Helpers
    {
        public class ProEventosProfile : Profile
        {
            public ProEventosProfile()
            {
                // Mapeamento entre Evento e EventoDTO
                CreateMap<Evento, EventoDTO>()
                    // Isso apenas será necessario caso o tipo de uma respectiva propriedade da DTO for diferente do tipo da Entidade como no exemplo abaixo.
                    .ForMember(dest => dest.DataEvento, opt => opt.MapFrom(src => src.dataEvento.HasValue ? src.dataEvento.Value.ToString("yyyy-MM-dd") : null))
                    .ReverseMap()
                    .ForMember(dest => dest.dataEvento, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.DataEvento) ? (DateTime?)null : DateTime.Parse(src.DataEvento)));
    
                // Exemplo de outros mapeamentos (Lote, RedeSocial, etc.)
                CreateMap<Lote, LoteDTO>().ReverseMap();
                CreateMap<RedeSocial, RedeSocialDTO>().ReverseMap();
            }
        }
    }
    ```

6. Criando o contrato do serviço no diretório **/Application/Contracts/** criaremos o contrato para Evento e Palestrante como segue nas imagens abaixo:
    1. **IEventoService.cs**
        ```csharp
        using Domain.entities;

        namespace Application.Contracts
        {
            public interface IEventoService
            {
                public Task<EventoDTO> AddEvento(Evento model);
                public Task<EventoDTO> UpdateEvento(int EventoId,Evento model);
                public Task<bool> DeleteEvento(int EventoId);
                public Task<EventoDTO[]> GetAllEventosAsync(bool IncludePalestrante = false);
                public Task<EventoDTO[]> GetAllEventosByTemaAsync( string Tema,bool IncludePalestrante = false);
                public Task<EventoDTO> GetEventoByIdAsync(int Id, bool IncludePalestrante = false);        
            }
        }
        ```
    2. **IPalestranteService.cs**
        ```csharp
        using Application.DTOs;
        using Domain.entities;

        namespace Application.Contracts
        {
            public interface IPalestranteService
            {
                public Task<PalestranteDTO> AddPalestrante(Palestrante model);
                public Task<PalestranteDTO> UpdatePalestrante(int PalestranteId, Palestrante model);
                public Task<PalestranteDTO> DeletePalestrante(int PalestranteId);
                public Task<PalestranteDTO[]> GetAllPalestrantesAsync(bool IncludeEvento = false);
                public Task<PalestranteDTO[]> GetAllPalestrantesByNameAsync(string Name, bool IncludeEvento = false);
                public Task<PalestranteDTO> GetPalestranteByIdAsync(int Id, bool IncludeEvento = false);
            }
        }
        ```
7. Agora iniciando as classes de Serviço no qual iremos herdar das interfaces criadas acima, criaremos o diretório: Application/Service, e aqui criaremos os arquivos abaixo:

    1. **EventoService.cs**
        ```csharp
        using AutoMapper;
        using Domain.entities;
        using Application.DTOs;
        using Application.Contracts;
        using Persistence.Contracts;

        namespace Application.Services
        {
            public class EventoService : IEventoService
            {
                private readonly IMapper _mapper;
                private readonly IGeralPersist geralPersist;
                private readonly IEventoPersist eventoPersist;
                public EventoService(IMapper _mapper,
                                     IGeralPersist geralPersist,
                                     IEventoPersist eventoPersist)
                {
                    this._mapper = _mapper;
                    this.geralPersist = geralPersist;
                    this.eventoPersist = eventoPersist;
                }
                public async Task<EventoDTO> AddEvento(Evento model)
                {
                    try
                    {
                        if(model == null) throw new Exception("Objeto Nulo ou inválido");
                        var evento = _mapper.Map<Evento>(model);
                        geralPersist.Add(evento);

                        if(await geralPersist.SaveChangesAsync())
                        {
                            var eventoRetorno = await eventoPersist.GetEventoByIdAsync(model.Id);
                            return _mapper.Map<EventoDTO>(eventoRetorno);
                        }
                        return null;
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Erro ao persistir o cadastro do evento: {ex.Message}");
                    }
                }

                public async Task<EventoDTO> UpdateEvento(int EventoId, Evento model)
                {
                    try
                    {
                        if(EventoId == null || model == null) throw new Exception("Erro ao Persistir atualização do Evento, EventoID ou Evento Inválido");
                        geralPersist.Update(model);

                        if(await geralPersist.SaveChangesAsync())
                        {
                            var eventoRetorno = await eventoPersist.GetEventoByIdAsync(EventoId);
                            return _mapper.Map<EventoDTO>(eventoRetorno);
                        }
                        return null;
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Erro ao persistir atualização do evento: {ex.Message}");
                    }
                }

                public async Task<bool> DeleteEvento(int EventoId)
                {
                    try
                    {
                        if(EventoId == null) throw new Exception("Erro ao Deletar Evento, ID Inválido ou inexistente.");
                        var evento = await eventoPersist.GetEventoByIdAsync(EventoId);
                        geralPersist.Delete(evento);

                        if(await geralPersist.SaveChangesAsync()) 
                        {
                            return true;
                        }
                        return false;
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Erro ao persistir a deleção do Evento: {ex.Message}");
                    }
                }

                public async Task<EventoDTO[]> GetAllEventosAsync(bool IncludePalestrante = false)
                {
                    try
                    {
                        var eventosRetorno = await eventoPersist.GetAllEventosAsync(IncludePalestrante);
                        return _mapper.Map<EventoDTO[]>(eventosRetorno);
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Erro ao recuperar todos os Eventos: {ex.Message}");
                    }
                }

                public async Task<EventoDTO[]> GetAllEventosByTemaAsync(string Tema, bool IncludePalestrante = false)
                {
                    try
                    {
                        if(Tema == null) throw new Exception("Erro ao recuperar Eventos por Tema, pois o campo está Nulo");
                        var eventosRetorno = await eventoPersist.GetAllEventosByTemaAsync(Tema);
                        return _mapper.Map<EventoDTO[]>(eventosRetorno);
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Erro ao recuperar Evento por Tema: {ex.Message}");
                    }
                }

                public async Task<EventoDTO> GetEventoByIdAsync(int Id, bool IncludePalestrante = false)
                {
                    try
                    {
                        if(Id == 0 || Id == null) throw new Exception("Erro ao recuperar Evento por ID: ID Inválido ou inexistente");
                        var eventoRetorno = await eventoPersist.GetEventoByIdAsync(Id);
                        return _mapper.Map<EventoDTO>(eventoRetorno);
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Erro ao recuperar Evento: {ex.Message}");
                    }
                }
            }
        }
        ```
    2. **PalestranteService.cs**
        ```csharp
        using AutoMapper;
        using Domain.entities;
        using Application.DTOs;
        using Application.Contracts;
        using Persistence.Contracts;
        using Persistence.Repositories;

        namespace Application.Services
        {
            public class PalestranteService : IPalestranteService
            {
                private readonly IMapper _mapper;
                private readonly IGeralPersist geralPersist;
                private readonly IPalestrantePersist palestrantePersist;
                public PalestranteService(IMapper _mapper,
                                          IGeralPersist geralPersist,
                                          IPalestrantePersist palestrantePersist)
                {
                    this._mapper = _mapper;
                    this.geralPersist = geralPersist;
                    this.palestrantePersist = palestrantePersist;        
                }

                public async Task<PalestranteDTO> AddPalestrante(PalestranteDTO model)
                {
                    try
                    {
                        if(model == null) throw new Exception("Modelo inválido para persistir o registro.");
                        var palestrante = _mapper.Map<Palestrante>(model);
                        geralPersist.Add(palestrante);
        
                        if(await geralPersist.SaveChangesAsync()) 
                        {
                            var palestranteRetorno  = await palestrantePersist.GetPalestranteByIdAsync(palestrante.Id);
                            return _mapper.Map<PalestranteDTO>(palestranteRetorno);
                        }
                        return null;
                    }
                    catch (Exception ex)
                    {   
                        throw new Exception($"Erro ao Persistir cadastro do palestrante: {ex.Message}");
                    }
                }

                public async Task<PalestranteDTO> UpdatePalestrante(int PalestranteId, Palestrante model)
                {
                    try
                    {
                        if (model == null || PalestranteId == null || PalestranteId <= 0) throw new Exception("Erro ao alterar Palestrante, ID inválido ou Objeto Inconsistente");

                        var palestrante = await palestrantePersist.GetPalestranteByIdAsync(PalestranteId);
                        if(palestrante.Id != model.Id) throw new Exception("ID fornecido não bate com ID do objeto para ser alterado");
                        geralPersist.Update(model);

                        if(await geralPersist.SaveChangesAsync())
                        {
                            var palestranteRetorno = await palestrantePersist.GetPalestranteByIdAsync(PalestranteId);
                            return _mapper.Map<PalestranteDTO>(palestranteRetorno);
                        }
                        return null;
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Erro ao Alterar o Palestrante: {ex.Message}");
                    }
                }

                public async Task<bool> DeletePalestrante(int PalestranteId)
                {
                    try
                    {
                        if(PalestranteId == null || PalestranteId < 0) throw new Exception("ID Nulo ou Inexistente");
                        var palestrante = await palestrantePersist.GetPalestranteByIdAsync(PalestranteId);
                        if(palestrante != null) throw new Exception("ID Inexistente para exclusão");
                        geralPersist.Delete(palestrante);

                        if(await geralPersist.SaveChangesAsync())
                        {
                            return true;
                        }
                        return false;
                    }
                    catch (Exception ex)
                    {

                        throw new Exception($"Erro ao persistir exclusão do palestrante: {ex.Message}");
                    }
                }

                public async Task<PalestranteDTO[]> GetAllPalestrantesAsync(bool IncludeEvento = false)
                {
                    try
                    {
                        var palestrantes = await palestrantePersist.GetAllPalestrantesAsync();
                        var palestrantesRetorno = _mapper.Map<PalestranteDTO[]>(palestrantes);
                        return palestrantesRetorno;
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Erro ao Recuperar palestrantes: {ex.Message}");
                    }
                }

                public async Task<PalestranteDTO[]> GetAllPalestrantesByNameAsync(string Name, bool IncludeEvento = false)
                {
                    try
                    {   
                        if(Name == null) throw new Exception("Erro ao recuperar Palestrante: nome Nulo");
                        var palestrantesRetorno = await palestrantePersist.GetAllPalestrantesByNameAsync(Name);
                        return _mapper.Map<PalestranteDTO[]>(palestrantesRetorno);
                    }
                    catch (Exception ex)
                    { 
                        throw new Exception($"Erro ao Recuperar Palestrantes Pelo Nome: {ex.Message}");
                    }
                }

                public async Task<PalestranteDTO> GetPalestranteByIdAsync(int Id, bool IncludeEvento = false)
                {
                    try
                    {
                        if(Id == null || Id < 0) throw new Exception("Erro ao reucuperar Usuario ID Inexistente");
                        var palestrante = await palestrantePersist.GetPalestranteByIdAsync(Id);
                        return _mapper.Map<PalestranteDTO>(palestrante);
                    }
                    catch (Exception ex)
                    {     
                        throw new Exception($"Erro ao Recuperar Palestrante: {ex.Message}");
                    }
                }
            }
        }
        ```
por momento nossa Application já estara respondendo a nossa API, e agora o próximo passo sera adicionar a camada de API para iniciar as comunicações via requisições http,

---

### 7. API

nesta camada iremos inicalmente criar nossa API, seguimos com o seguinte codigo via terminal dentro do diretorio **back**: 
```csharp
    dotnet new webapi -n ProEvento.API
```

seguiremos adicionando o novo projeto a solução ja criada, e seguiremos com o comando:
```csharp
    dotnet sln .\ProEvento.sln add .\API\
```

próximo passo sera adicionar as referencias necessarias a API que seria a camada de **Aplicação** e camada de **Persistencia**
```csharp
dotnet add .\API\ reference .\Application\
dotnet add .\API\ reference .\Persistence\
```

1.  Adicionando as dependencias necessarias para rodar a API:
```csharp
    <PackageReference Include="Microsoft.AspNetCore.Cors" Version="2.3.0" />
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="8.0.14" />
	<PackageReference Include="Swashbuckle.AspNetCore.SwaggerUI" Version="7.2.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="9.0.0">
    <PackageReference Include="Swashbuckle.AspNetCore" Version="8.1.0" />
    <PackageReference Include="Microsoft.AspNetCore.Mvc.NewtonsoftJson" Version="8.0.3" />
```

2. Configurando o **Program.cs**
```csharp
using Persistence.Context;
using Persistence.Contracts;
using Persistence.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors();
builder.Services.AddControllers()
    .AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
//Add Scopeds
builder.Services.AddScoped<IGeralPersist, GeralPersist>();
builder.Services.AddScoped<IEventoPersist, EventoPersist>();
builder.Services.AddScoped<IPalestrantePersist, PalestrantePersist>();

builder.Services.AddDbContext<ProEventoContext>(options =>
    options.UseSqlite("DATA Source=banco.db")
);

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.UseHttpsRedirection();
app.Run();
```
Agora iremos iniciar a configuração de nossa primeira controller, a controller que sera responsavel pelas rotas dos Eventos, teremos outras controller também para outras entidades, commo por exmeplo Palestrante e Login.
```csharp
using Application.DTOs;
using Application.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly IEventoService _eventoSerivce;
        public EventoController(IEventoService _eventoSerivce)
        {
            this._eventoSerivce = _eventoSerivce;
        }

        [HttpPost]
        public async Task<IActionResult> AddEvento(EventoDTO model) 
        {
            try
            {
                if(model == null) return BadRequest("Erro ao tentar adicioanr evento");
                var evento = await _eventoSerivce.AddEvento(model);
                if(evento != null) return Ok(evento);
                return BadRequest("Erro ao persistir cadastro ao banco");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar eventos. Erro: {ex.Message}"
                );
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvento(int id, EventoDTO model) 
        {
            var evento = await _eventoSerivce.UpdateEvento(User.GetUserId(), id, model);
            if(evento == null) return BadRequest("Erro ao tentar adicionar evento");
            return Ok(evento);
        }
                [HttpGet]
        public async Task<IActionResult> GetEventos() 
        {
            try
            {
                var eventos = await _eventoSerivce.GetAllEventosAsync(false);
                if (eventos == null) return NoContent();
                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetEventoById(int id)
        {
            try
            {
                var eventos = await _eventoSerivce.GetEventoByIdAsync(id, false);
                if(eventos == null) return NoContent();
                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvento(int Id) 
        {
            try
            {
                if(Id == null || Id < 0) return BadRequest("Erro ao tentar deletar usuario");
                var resultado = await _eventoSerivce.DeleteEvento(Id);

                if(resultado) return Ok("Evento deletado");
                return BadRequest("Evento não deletado");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar eventos. Erro: {ex.Message}"
                );
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetEventoByTema(string tema) 
        {
            try
            {
                var evento = await _eventoSerivce.GetAllEventosByTemaAsync(tema, false);
                if(evento == null) return NoContent();
                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tenhtar recuperar eventos. Erro: {ex.Message}"
                );
            }
        }
    }
}
```

e agora iremos criar a migration para gerar nosso banco com os comandos:
```csharp
    dotnet ef migrations add InitialCreate -p .\Persistence\ -s .\API\ // Para criar a primeiro migration por nome de InitialCreate
    dotnet ef database update -p .\API\
```

### 8. Autenticação JWT

#### Nesta seção inicaremos aconfiguração do middleware JWT em nossa aaplicação com isso iremos configurar o token criptografado para o usuario poder acessar as rotas do nosso sistema.

#### 1. Instalar o package Dotnet Entity dentro das camadas de **Domain**,

```CSHARP
    Microsoft.AspNetCore.Identity.EntityFrameworkCore
```

#### 2. Criar diretório chamado **Identity** e **Enum** dentro da camada de Domain, ambos diretorios precisma estár no mesmo nivel hierarquicos

#### 3. Diretorio **Enum** criaremos um arquivo de tipo **Enum** e está sera a função do usuario paritcipante do evento Funcao.cs:
```CSHARP
namespace Domain.Enum
{
    public enum Funcao
    {
        NaoInformado,
        Participante,
        Palestrante
    }
}
```

#### Também criaremos um **Enum** no mesmo diretório com o nome de Titulo no qual sera o titulo de formação do usuario, Titulo.cs:
```CSHARP
namespace Domain.Enum
{
    public enum Titulo
    {
        NaoInformado,
        Tecnologo,
        Bacharel,
        Especialista,
        PosGraduado,
        Mestrado,
        Doutorado,
        PosDoutorado
    }
}
```

#### 4. Criando classe de usuario no diretório Identity chamando **User.cs** ela ficara assim, User.cs:
```CSHARP
using Domain.Enum;
using Microsoft.AspNetCore.Identity;

namespace Domain.Identity
{
    public class User : IdentityUser<int> //INT siguinifica que a key vai ser INT e não GUIDE
    {
        public string PrimeiroNome { get; set; }
        public string UltimoNome { get; set; }
        public Titulo Titulo { get; set; } = Titulo.NaoInformado;
        public string? Descricao { get; set; }
        public Funcao Funcao { get; set; } = Funcao.NaoInformado;
        public string? ImagemPerfil { get; set; }
        public IEnumerable<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }
}
```
#### 5. Criando Classe **Role**, essa classe sera responsavel por abrigar os niveis de Acesso que os demais usuarios poderão ter no sistema, cada usuario pode ter um ou mais Role e cada Role pode pertencer a um ou mais Usuarios, para isso iremos criar uma classe intermediaria chamada **UserRole.cs** para fazer a interação entre as duas classes que são muito para muitos entre User <--> Role, Arquivo Role.cs:
```CSHARP
namespace Domain.Identity
{
    public class Role : IdentityRole<int>
    {
        public IEnumerable<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }
}
```

#### 6. Criando classe **UserRole** no qual sera o intermedio entre as duas classe User e Role, UserRole.cs:
```CSHARP
namespace Domain.Identity
{
    public class UserRole : IdentityUserRole<int>
    {
        public User User { get; set; }
        public Role Role { get; set; }
    }
}
```
#### 7. Agora em todas as Entidades modelos que tera alteração por um usuario adicionaremos nela as propriedades listadas abaixo para o controle de quem alterou o que no sistema, e também para fazer uma validação se aquele usuario pode alterar alguam coisa com a role que ele tem, Exemplo Entidade modelo **Evento.cs**:
```CSHARP
    public int UserId { get; set; }
    public User User { get; set; }
```

#### 8. também iremos adicionar as propriedades de User dentro da tabela Palestrante pois palestrante também e o registro de uma pessoa, porém para a pessoa estar registrada primeiro ela necessitar ser um usuario no sistema, assim ficaria a tabela Palestrante com usuario integrado nela, Palestrante.cs:
```CSHARP
using Domain.Identity;

namespace Domain.entities
{
    public class Palestrante
    {
        public int Id { get; set; }        
        public string MiniCurriculo { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public IEnumerable<RedeSocial> RedesSociais { get; set; } = new List<RedeSocial>();
        public IEnumerable<EventoPalestrante> EventosPalestrantes { get; set; } = new List<EventoPalestrante>();
    }
}
```

#### Associações completas iniciaremos o passo de configurar o Contexto para Autenticação

#### 9. Configurando  o **Contexto**, inicalmente adicionaremos o package Microsoft.Identity.EntityFrameworkCore a nossa camada de Persistencia:
```CSHARP
<PackageReference Include="Microsoft.AspNetCore.Identity.EntityFrameworkCore" Version="9.0.3" />
```

#### 10. Adicionando a herança no ProEventoContext, agora iremos trocar a herança de classe do nosso contexto pois agora também teremos o DbSet de usuario, Role e UsuerRole para ser utilizado, com isso temos a classe de herança que ja irá fornecer essas informações para nós, sendo assim o nosso arquivo ProEventosContext.cs ficará assim herdadando o IdentityDbContext: 


#### Lembrando que para sobrescrever a confiugração padrão dos o id de IdentityUser, Role, UserRole precisamos sobrescrever o **IdentityDbContext<>** utilizando os <> para chegar nas propriedades necessarias como parametro iremos selecionar o IdentityDbContext e apertar F12 assim conseguimos chegar nas informações necessarias para sobrescrever e dentro dos <> de cada classe iremos adicionar a tipagem que queremos naqula propriedade que no nosso caso deste projeto sera int, e ficara logo assim:
```CSHARP
using Domain.entities;
using Domain.Identity;
using System.Reflection;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence.Context
{
    public class ProEventoContext : IdentityDbContext<User, Role, int,
                                                      IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
                                                      IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public ProEventoContext(DbContextOptions<ProEventoContext> options) : base(options) { }
        public DbSet<Evento> Eventos { get; set; } 
        public DbSet<Lote> Lotes { get; set; }
        public DbSet<RedeSocial> RedesSociais { get; set; }
        public DbSet<Palestrante> Palestrantes { get; set; }
        public DbSet<EventoPalestrante> EventosPalestrantes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

    
        }
    }
}
```

#### 11. Agora iremos criar o arquivo de configuração do fluenteAPI sobre a tabela **UserRole.cs** sendo que ela é uma associação entre User <---> UserRole e Role <---> UserRole assim criaremos o arquivo **Persistence/Configurations/UserRoleConfiguration.cs** e ele ficara assim:
```CSHARP
using Domain.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class UserRoleConfiguration : IEntityTypeConfiguration<UserRole>
    {
        public void Configure(EntityTypeBuilder<UserRole> builder)
        {
            //Criando uma chave Primaria composta por duas chaves estrangeiras
            builder.HasKey(UR => new { UR.UserId, UR.RoleId});

            builder.HasOne(UR => UR.User)
                .WithMany(U => U.UserRoles)
                .HasForeignKey(UR => UR.UserId) // Quando a chave primaria é composta precisamos especificar de onde vem as chaves estrangerias
                .IsRequired();

            builder.HasOne(UR => UR.Role)
                .WithMany(R => R.UserRoles)
                .HasForeignKey(UR => UR.RoleId) // Quando a chave primaria é composta precisamos especificar de onde vem as chaves estrangerias
                .IsRequired();
        }
    }
}
```
#### 12. Agora iremos apagar nosso banco e subir uma nova Migration para adicionar as novas propriedades do banco, que no caso é as propriedades de Usuario User, Role, UserRole. apos criar essa nova migration iremos rodar o database update, seguimos os seguintes comando após a exclusão do banco:
```CSHARP
    dotnet ef migrations add Adicionando-Identity -p ProEventos.Persistence -s ProEventos.API
    dotnet ef database update -s ProEventos.API
```

#### Após criar o banco novamente podemos ja verificar que temos as tabelas AspNet ja integradas no banco, e assim podemos prosseguir com a autenticação do JWT em nosso projeto e adicionar as rotas de Login.

#### 13. Criando Interface Persistencia de Usuario, e fazer o caminho de Persistencia, Serviço e API/Controller, Dentro da camada de Persistencia criaremos a Interface chamada IUserPersist.cs e depois a classe UserPersist.cs:
#### IUserPersist.cs
```CSHARP
using Domain.Identity;

namespace Persistence.Contracts
{
    public interface IUserPersist : IGeralPersist //neste ponto estamos herdando IGeralPersist dentro da nossa interface atual.
    {
        public Task<IEnumerable<User>> GetUsersAsync();
        public Task<User> GetUserByIdAsync(int id);
        public Task<User> GetUserByUsernameAsync(string username);
    }
}
```
#### 14. Após criar nossa Classe **UserPersist.cs** iremos herdar ela da classe GeralPerist e a interface IUserPersist, neste ponto iremos herdar a classe GeralPersist para completar o requisito de nossa interface IUser no qual ela exige que fornecemos de todos os metodos contidos na interface IGeralPersiste també, a classe ficara da seguinte forma, **UserPersis.cs**: 
```CSHARP

using Domain.Identity;
using Persistence.Context;
using Persistence.Contracts;

namespace Persistence.Repositories
{                              //Aqui Herdamos a classe GeralPersist para completar a necessidade da interface 
    public class UserPersist : GeralPersist, IUserPersist
    {
        private readonly ProEventoContext context;
        public UserPersist(ProEventoContext context) : base(context) //Compartilhando o contexto com a classe base GeralPersist
        {
            this.context = context;
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await context.Users.ToListAsync();
        }
        public async Task<User> GetUserByIdAsync(int id)
        {                               //faz uam pesquisa pela chave primaria, podendo ser chave primaria composta separando o parametro por > ",".  se não encontrar nada retornar null
            return await context.Users.FindAsync(id);
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {                               //Espera que só exista um elemento que satisfaça a condição, Se encontrar mais de um, lança exceção, Se não encontrar nenhum, retorna null.
            return await context.Users.SingleOrDefaultAsync(U => U.UserName == username);
        }
    }
}
```
#### 15. Iniciando o Serviço para gerenciar as contas, primeiro iremos criar a interface **IAccountService.cs** utilizaremos como camada de logica sobre o repositorio de User, o contrato ficara assim, **IAccountService.cs**:
```CSHARP
using Application.DTOs;
using Microsoft.AspNetCore.Identity;

namespace Application.Contracts
{
    public interface IUserService
    {
        Task<bool> UserExists(string username);
        Task<UserUpdateDTO> GetUserByUsernameAsync(string username);
        Task<SignInResult> CheckUserPasswordAsync(string userUpdateDTO, string password);
        Task<UserDTO> CreateAccountAssync(UserDTO userDTO);
        Task<UserUpdateDTO> UpdateAccount(UserUpdateDTO userUpdateDTO);
    }
}
```

#### 16. Em seguida iremos criar todas as DTOs necessarias para fornecer para o Serviço: "**UserUpdateDTO**", "**UserDTO**". Iniciando com a **UserUpdateDTO**: 

```CSHARP
namespace Application.DTOs
{
    public class UserUpdateDTO
    {
        public string Id { get; set;}
        public string Titulo { get; set; }
        public string UserName { get; set; }
        public string PrimeiroNome { get; set; }
        public string UltimoNome { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Funcao { get; set; }
        public string Descricao { get; set; }
        public string Password { get; set; }
    }
}
```

#### **UserDTO**: 
```CSHARP
namespace Application.DTOs
{
    public class UserDTO
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PrimeiroNome { get; set; }
        public string UltimoNome { get; set; }
    }
}
```

#### **UserLoginDTO**:
```CSHARP
namespace Application.DTOs
{
    public class UserLoginDTO
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
```

#### Mapeando as novas DTO para utilizar o autoMapper dentro da aplicação, iremos adicionar as seguinte linhas no arquivo **ProEventoProfile.cs** que se encontra dentro de nossa camada de aplicação no diretório Helpers:
```CSHARP
            // Mapemanento da Autorizção
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<User, UserLoginDTO>().ReverseMap();
            CreateMap<User, UserUpdateDTO>().ReverseMap();
```

#### 17. Criando o Serviço **AccountService** herdamos ela de IAccountSerivce e adicionando o package **Identity Entity a camada de amplicação**:
```CSHARP
    <PackageReference Include="Microsoft.AspNetCore.Identity" Version="2.3.1" />
    <PackageReference Include="Microsoft.IdentityModel.Tokens" Version="8.9.0" />
    <PackageReference Include="System.IdentityModel.Tokens.Jwt" Version="8.9.0" />
```

#### Após Adicionarmos o pacote iniciaremos as implementações, arquivo **AccountService.cs** :
```CSHARP
using AutoMapper;
using Domain.Identity;
using Application.DTOs;
using Application.Contracts;
using Persistence.Contracts;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class AccountService : IAccountService
    {
        private readonly IMapper mapper;
        private readonly UserManager<User> userManager;
        private readonly IUserPersist userPersist;
        private readonly SignInManager<User> signInManager;

        public AccountService(UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper, IUserPersist userPersist)
        {
            this.userManager = userManager;
            this.mapper = mapper;
            this.userPersist = userPersist;
            this.signInManager = signInManager;
            
        }
        public async Task<SignInResult> CheckUserPasswordAsync(UserUpdateDTO userUpdateDTO, string password)
        {
            try
            {
                var user = await userManager.Users.SingleOrDefaultAsync(U => U.UserName == userUpdateDTO.UserName);  
                return await signInManager.CheckPasswordSignInAsync(user, password, false);
            }
            catch (Exception ex)
            {
                
                throw new Exception($"Erro ao tentar verificar password. Erro: {ex.Message}");
            }
        }

        public async Task<UserDTO> CreateAccountAssync(UserDTO userDTO)
        {
            try
            {
                var user = mapper.Map<User>(userDTO);
                var result = await userManager.CreateAsync(user, userDTO.Password);

                if(result.Succeeded) 
                {
                    var userRetorno = mapper.Map<UserDTO>(user);
                    return userRetorno;
                }
                return null;
            }
            catch (Exception ex)
            {
                
                throw new Exception($"Erro ao tentar Criar Conta. Erro: {ex.Message}");
            }
        }

        public async Task<UserUpdateDTO> GetUserByUsernameAsync(string username)
        {
            try
            {
                var user = await userManager.FindByNameAsync(username);

                if(user == null) return null;

                var userRetorno = mapper.Map<UserUpdateDTO>(user);
                return userRetorno;
            }
            catch (Exception ex)
            {
                
                throw new Exception($"Erro ao tentar Recuperar Usuario. Erro: {ex.Message}");
            }
        }

        public async Task<UserUpdateDTO> UpdateAccount(UserUpdateDTO userUpdateDTO)
        {
            try
            {
                var user = await userPersist.GetUserByUsernameAsync(userUpdateDTO.UserName);
                if(user == null) return null;

                var token = await userManager.GeneratePasswordResetTokenAsync(user);
                var result = await userManager.ResetPasswordAsync(user, token, userUpdateDTO.Password);

                mapper.Map(userUpdateDTO, user);
                userPersist.Update(user);

                if(await userPersist.SaveChangesAsync()) 
                {
                    var userRetorno = await userPersist.GetUserByUsernameAsync(user.UserName);
                    return mapper.Map<UserUpdateDTO>(userRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                
                throw new Exception($"Erro ao tentar Atualizar Cadastro. Erro: {ex.Message}");
            }
        }

        public async Task<bool> UserExists(string username)
        {
            try
            {
                return await userManager.Users.AnyAsync(U => U.UserName == username.ToLower());
            }
            catch (Exception ex)
            {
                
                throw new Exception($"Erro ao tentar verificar Username. Erro: {ex.Message}");
            }
        }
    }
}
```

#### 18. Iniciando a interface do **ITokenService** agora iremos definir o contrato de nossa classe de token,:
```CSHARP
using Application.DTOs;

namespace Application.Contracts
{
    public interface ITokenService
    {
        Task<string> CreateToken(UserUpdateDTO userUpdateDTO);
    }
}
```

#### 19 Criando o serviço **TokenService.cs**, neste arquivo iremos fazer toda configuração de como sera gerado nosso token e o que ira conter nele:
```CSHARP
using AutoMapper;
using Domain.Identity;
using System.Text;
using Application.DTOs;
using Application.Contracts;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace Application.Services
{
    public class TokenService : ITokenService
    {
        private readonly IMapper mapper;
        private readonly SymmetricSecurityKey key;
        private readonly IConfiguration configuration;
        private readonly UserManager<User> userManager;
        public TokenService(IConfiguration configuration, UserManager<User> userManager, IMapper mapper)
        {
            this.userManager = userManager;
            this.mapper = mapper;
            this.configuration = configuration;
            this.key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenKey"]));
        }
        public async Task<string> CreateToken(UserUpdateDTO userUpdateDTO)
        {
            var user = mapper.Map<User>(userUpdateDTO);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var roles = await userManager.GetRolesAsync(user);

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescription);

            return tokenHandler.WriteToken(token);
        }
    }
}
```
#### Adicionando o hash da chave secreta no **appsettings.json**:
```CSHARP
"TokenKey": "sS8z9@M1p7Kf!3Vr2QwZxLpTnGhYcAeRiUoPaSdFgHjKlZxCvBnMqWeRtYuIoPlMn"
```

#### Realizando referencia do Identity Dentro do **Program.cs**, primeiro iremos adicionar o package Authentication.JwtBearer na camada de API
```CSHARP
<PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="9.0.4" />
<PackageReference Include="Microsoft.AspNetCore.Identity.EntityFrameworkCore" Version="9.0.4" />
```
#### Iniciando a configuração da autenticação e confiugração da senha JWT, segue como irá ficar o arquivo **program.cs**:
```CSHARP
using System.Text;
using Domain.Identity;
using Scalar.AspNetCore;
using Persistence.Context;
using Application.Services;
using Application.Contracts;
using Persistence.Contracts;
using Persistence.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

#region 🔧 Configuração de Serviços (DI - Dependency Injection)

// 🔄 Suporte a CORS (Cross-Origin Resource Sharing)
builder.Services.AddCors();

// 📦 Controllers com suporte a JSON e tratamento de loops de referência
builder.Services.AddControllers()
    .AddJsonOptions(options =>
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()) // Serializa enums como string
    )
    .AddNewtonsoftJson(options =>
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore // Evita loop de referência nos objetos
    );

// 🔁 AutoMapper - Mapeia objetos entre camadas
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

#endregion

#region 🔐 Configuração de Identity (Usuários, Senhas, Regras)

builder.Services.AddIdentityCore<User>(options =>
    {
        // Regras para criação de senha
        options.Password.RequireDigit = false;
        options.Password.RequireNonAlphanumeric = true;
        options.Password.RequireLowercase = false;
        options.Password.RequireUppercase = false;
        options.Password.RequiredLength = 4;
    })
    .AddRoles<Role>()
    .AddRoleManager<RoleManager<Role>>()
    .AddSignInManager<SignInManager<User>>()
    .AddRoleValidator<RoleValidator<Role>>()
    .AddEntityFrameworkStores<ProEventoContext>() // Usa o EF para armazenar usuários
    .AddDefaultTokenProviders();

#endregion

#region 🔑 Configuração da Autenticação JWT

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])
            ),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

#endregion

#region 🗃️ Configuração do Banco de Dados

builder.Services.AddDbContext<ProEventoContext>(options =>
    options.UseSqlite("Data Source=banco.db")
);

#endregion

#region 📦 Injeção de Dependência (Aplicação e Persistência)

// Repositórios
builder.Services.AddScoped<IGeralPersist, GeralPersist>();
builder.Services.AddScoped<IEventoPersist, EventoPersist>();
builder.Services.AddScoped<IPalestrantePersist, PalestrantePersist>();
builder.Services.AddScoped<IUserPersist, UserPersist>();

// Serviços
builder.Services.AddScoped<IEventoService, EventoService>();
builder.Services.AddScoped<IPalestranteService, PalestranteService>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<ITokenService, TokenService>();

#endregion

#region 📘 Documentação Swagger (OpenAPI)

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

#endregion

var app = builder.Build();

#region 🧪 Ambiente de Desenvolvimento (Database + Swagger)

if (app.Environment.IsDevelopment())
{
    // Inicializa o banco recriando do zero
    var dbContext = app.Services.CreateScope().ServiceProvider.GetRequiredService<ProEventoContext>();
    dbContext.Database.EnsureDeleted();
    dbContext.Database.EnsureCreated();

    // Habilita documentação da API
    app.UseSwagger();
    app.UseSwaggerUI(c =>
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "ProEvento V1")
    );

    // Mapeia documentação extra (Scalar)
    app.MapOpenApi();
    app.MapScalarApiReference();
}

#endregion

#region 🚀 Pipeline de Execução

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.MapControllers();

app.Run();

#endregion

```

### 20.1 Criando Classe de extenção dentro da camada de API para poder recuperar Username ou Id das claims da token, criaremos o diretório com o nome Extensions, e em seguida classe de extenção sobre a classe **Security.Claims** ficando assim: **ClaimsPrincipalExtensions.cs**
```CSHARP
using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetUserName(this ClaimsPrincipal user) 
        {
            return user.FindFirst(ClaimTypes.Name)?.Value;
        }

        public static int GetUserId(this ClaimsPrincipal user) 
        {
            return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        }
    }
}
```

### 20.2 Iniciando Controller de Account, seguimos agora para a ultima etapa da camade de API criando as rotas para autorização, Login, Criar conta, update etc.....
```CSHARP
using API.Extensions;
using Application.DTOs;
using Application.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controller
{   
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly ITokenService tokenService;
        private readonly IAccountService accountService;
        public AccountController(IAccountService accountService, ITokenService tokenService)
        {
            this.tokenService = tokenService;
            this.accountService = accountService;
        }

        [HttpGet("GetUser")]
        public async Task<IActionResult> GetUser()
        {
            try
            {
                var userName = User.GetUserName();
                var user = await this.accountService.GetUserByUsernameAsync(userName);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Usuário. Erro: {ex.Message}");
            }
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> RegisterUser(UserDTO userDTO)
        {
            try
            {
                if (await accountService.UserExists(userDTO.UserName)) return BadRequest("Usuario já Existe");

                var user = await accountService.CreateAccountAssync(userDTO);
                if(user != null) return Ok(user);

                return BadRequest("Usuário não criado, tente novamente.");

            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Usuário. Erro: {ex.Message}");
            }
        }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateUser(UserUpdateDTO userUpdateDTO)
        {
            try
            {
                var user = await accountService.GetUserByUsernameAsync(User.GetUserName());
                if(user == null) return Unauthorized("Usuário Inválido.");

                var userReturn = await accountService.UpdateAccount(userUpdateDTO);
                if(userReturn != null) return Ok(userReturn);
                else return BadRequest("Erro ao alterar Usuário.");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar alterar Usuário. Erro: {ex.Message}");
            }
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(UserLoginDTO userLogin)
        {
            try
            {
                var user = await this.accountService.GetUserByUsernameAsync(userLogin.UserName);
                if(user == null) return Unauthorized("Usuário ou senha está errado.");

                var result = await accountService.CheckUserPasswordAsync(user, userLogin.Password);
                if(!result.Succeeded) return Unauthorized();

                return Ok(new 
                {
                    userName = user.UserName,
                    PrimeiroNome = user.PrimeiroNome,
                    Funcao = user.Funcao,
                    Titulo = user.Titulo,
                    token = tokenService.CreateToken(user).Result
                });
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Usuário. Erro: {ex.Message}");
            }
        }
    }
}
```
### Testaremos com está rota no insomnia por exemplo:
```
    http://localhost:5241/api/account/GetUser/teste
```

#### 21. Preparando a entidade Evento pra ter registro do usuario junto com o cadastro do Evento, para futuramente o usuario X buscar todos os eventos pertencentes ao usuario X, e não trazer eventos do usuario Y, Exemplo da persistencia de Evento, EventoPersist.cs, lembrando que antes de alterar os parametros da persistencia, precisamos alterar os parametros da interface. **EventoPersist.cs**
```CSHARP
using Domain.entities;
using Persistence.Context;
using Persistence.Contracts;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories
{
    public class EventoPersist : IEventoPersist
    {
        public ProEventoContext context { get; }
        public EventoPersist(ProEventoContext context)
        {
            this.context = context;
        }

        public async Task<Evento[]> GetAllEventosAsync(int userId, bool IncludePalestrante = false)
        {
            IQueryable<Evento> query = context.Eventos.Include(E => E.Lotes).Include(E => E.RedesSociais).AsNoTracking()
                .Where(e => e.UserId == userId && e.UserId == userId); // Aqui estamos utilizando o filtro para trazer os eventos pelo usuario

            if(IncludePalestrante) query = query.Include(E => E.EventosPalestrantes).ThenInclude(EP => EP.Evento);

            return await query.ToArrayAsync();
        }

        public async Task<Evento[]> GetAllEventosByTemaAsync(int userId, string Tema, bool IncludePalestrante = false)
        {
            IQueryable<Evento> query = context.Eventos.Include(E => E.Lotes).Include(E => E.RedesSociais).AsNoTracking()
                .Where(E => E.UserId == userId); // Aqui estamos utilizando o filtro para trazer os eventos pelo usuario

            if(IncludePalestrante) query = query.Include(E => E.EventosPalestrantes).ThenInclude(EP => EP.Evento);

            query = query.Where(E => E.Tema == Tema);

            return await query.ToArrayAsync();
        }

        public async Task<Evento> GetEventoByIdAsync(int userId, int Id, bool IncludePalestrante = false)
        {
            IQueryable<Evento> query = context.Eventos.Include(E => E.Lotes).Include(E => E.RedesSociais).AsNoTracking()
                .Where(E => E.UserId == userId); // Aqui estamos utilizando o filtro para trazer os eventos pelo usuario

            if(IncludePalestrante) query = query.Include(E => E.EventosPalestrantes).ThenInclude(EP => EP.Evento);

            query = query.Where(E => E.Id == Id);

            return await query.FirstOrDefaultAsync();
        }
    }
}
```
#### 21. Preparando a camada de aplicação para está alteração ou seja trazendo o ID do usuario também, implementando no **EventoService.cs**, lembrando anteriormente de adicionar as propriedades de usuario no EventoDTO, adicionando as propriedades UserID e User.
```CSHARP
using AutoMapper;
using Domain.entities;
using Application.DTOs;
using Application.Contracts;
using Persistence.Contracts;

namespace Application.Services
{
    public class EventoService : IEventoService
    {
        private readonly IMapper _mapper;
        private readonly IGeralPersist geralPersist;
        private readonly IEventoPersist eventoPersist;
        public EventoService(IMapper _mapper,
                             IGeralPersist geralPersist,
                             IEventoPersist eventoPersist)
        {
            this._mapper = _mapper;
            this.geralPersist = geralPersist;
            this.eventoPersist = eventoPersist;
        }
        public async Task<EventoDTO> AddEvento(int userId, EventoDTO model)
        {
            try
            {
                if(model == null) throw new Exception("Objeto Nulo ou inválido");
                model.UserID = userId; // Adicionando O ID do usuario ao evento e assim segue nos demais metodos

                var evento = _mapper.Map<Evento>(model);
                geralPersist.Add(evento);

                if(await geralPersist.SaveChangesAsync())
                {
                    var eventoRetorno = await eventoPersist.GetEventoByIdAsync(userId, model.Id);
                    return _mapper.Map<EventoDTO>(eventoRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao persistir o cadastro do evento: {ex.Message}");
            }
        }

        public async Task<EventoDTO> UpdateEvento(int userId, int EventoId, EventoDTO model)
        {
            try
            {
                if(EventoId == null || model == null) throw new Exception("Erro ao Persistir atualização do Evento, EventoID ou Evento Inválido");
                model.UserID = userId;
                model.Id = EventoId;

                var eventoUpdate = await eventoPersist.GetEventoByIdAsync(userId ,EventoId);
                if(eventoUpdate == null) throw new Exception("ID Evento Inválido ou Inexistente");

                _mapper.Map(model, eventoUpdate);
                geralPersist.Update(eventoUpdate);

                if (await geralPersist.SaveChangesAsync())
                {
                    return _mapper.Map<EventoDTO>(eventoUpdate);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao persistir atualização do evento: {ex.Message}");
            }
        }

        public async Task<bool> DeleteEvento(int userId, int EventoId)
        {
            try
            {
                if(EventoId == null) throw new Exception("Erro ao Deletar Evento, ID Inválido ou inexistente.");
                var evento = await eventoPersist.GetEventoByIdAsync(userId, EventoId);
                geralPersist.Delete(evento);

                if(await geralPersist.SaveChangesAsync()) 
                {
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao persistir a deleção do Evento: {ex.Message}");
            }
        }

        public async Task<EventoDTO[]> GetAllEventosAsync(int userId, bool IncludePalestrante = false)
        {
            try
            {
                var eventosRetorno = await eventoPersist.GetAllEventosAsync(userId, IncludePalestrante);
                return _mapper.Map<EventoDTO[]>(eventosRetorno);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao recuperar todos os Eventos: {ex.Message}");
            }
        }

        public async Task<EventoDTO[]> GetAllEventosByTemaAsync(int userId, string Tema, bool IncludePalestrante = false)
        {
            try
            {
                if(Tema == null) throw new Exception("Erro ao recuperar Eventos por Tema, pois o campo está Nulo");
                var eventosRetorno = await eventoPersist.GetAllEventosByTemaAsync(userId, Tema);
                return _mapper.Map<EventoDTO[]>(eventosRetorno);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao recuperar Evento por Tema: {ex.Message}");
            }
        }

        public async Task<EventoDTO> GetEventoByIdAsync(int userId, int Id, bool IncludePalestrante = false)
        {
            try
            {
                if(Id == 0 || Id == null) throw new Exception("Erro ao recuperar Evento por ID: ID Inválido ou inexistente");
                var eventoRetorno = await eventoPersist.GetEventoByIdAsync(userId, Id);
                return _mapper.Map<EventoDTO>(eventoRetorno);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao recuperar Evento: {ex.Message}");
            }
        }
    }
}
```
### 22. Subindo uma camada a mais agora iremos para a API, nesta camada teremos que passar o ID do usuario para a chamada dos metodos da camada de aplicaçao, e para isso iremos utilizar a classe de extensão que criamos para recuperar o ID do usuario utilziando o token como base, iria ficar assim o arquivo **EventoController.cs**:
```CSHARP
using API.Extensions;
using Application.DTOs;
using Application.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly IEventoService _eventoSerivce;
        private readonly IAccountService accountService;
        public EventoController(IEventoService _eventoSerivce, IAccountService accountService)
        {
            this.accountService = accountService;
            this._eventoSerivce = _eventoSerivce;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddEvento(EventoDTO model) 
        {
            try
            {
                if(model == null) return BadRequest("Erro ao tentar adicioanr evento");
                var evento = await _eventoSerivce.AddEvento(User.GetUserId(), model);// exemplo de como utilizar o metodo de extensão para recuperar o id do usuario se baseando no token.
                if(evento != null) return Ok(evento);
                return BadRequest("Erro ao persistir cadastro ao banco");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar eventos. Erro: {ex.Message}"
                );
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvento(int Id, EventoDTO model) 
        {
            var evento = await _eventoSerivce.UpdateEvento(User.GetUserId(), Id, model);
            if(evento == null) return BadRequest("Erro ao tentar adicionar evento");
            return Ok(evento);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvento(int Id) 
        {
            try
            {
                if(Id == null || Id < 0) return BadRequest("Erro ao tentar deletar usuario");
                var resultado = await _eventoSerivce.DeleteEvento(User.GetUserId(), Id);

                if(resultado) return Ok("Evento deletado");
                return BadRequest("Evento não deletado");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar eventos. Erro: {ex.Message}"
                );
            }
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetEventos() 
        {
            try
            {
                var eventos = await _eventoSerivce.GetAllEventosAsync(User.GetUserId(), false);
                if (eventos == null) return NoContent();
                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventoById(int id)
        {
            try
            {
                var eventos = await _eventoSerivce.GetEventoByIdAsync(User.GetUserId(), id, false);
                if(eventos == null) return NoContent();
                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [Authorize]
        [HttpGet("tema/")]
        public async Task<IActionResult> GetEventoByTema(string tema) 
        {
            try
            {
                var evento = await _eventoSerivce.GetAllEventosByTemaAsync(User.GetUserId(), tema, false);
                if(evento == null) return NoContent();
                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tenhtar recuperar eventos. Erro: {ex.Message}"
                );
            }
        }
    }
}
```
#### 23. Lembrnado que em nosso **EventoDTO.cs** precisamos adicionar as infomrações do usuario também, adicionando as seguinte linhas:
```CSHARP
    public int UserID { get; set; }
    public UserDTO? UserDto { get; set; }
```
#### 24 - Preparando o swagger para receber a Token, neste momento precisaremos configurar o SwaggerGen para permitir o uso da Bearer autenticaton dentro do proprio swagger GUI, para isto vamos a classe **Program.cs** e adicionaremos a configuração sobre o **swaggergen** adicionando as seguintes linhas:

```CSHARP
#region 📘 Documentação Swagger (OpenAPI)

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = @"JWT Authorization header usando Bearer. Entre com 'Bearer' [espaço] então coloque seu token.
        Ememplo: 'Bearer 12345abcdef'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string>()
        }

    });
});

#endregion
```

#### 25 - 
