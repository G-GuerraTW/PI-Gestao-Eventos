using Domain.entities;
using Domain.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class TicketConfiguration : IEntityTypeConfiguration<Ticket>
    {
        public void Configure(EntityTypeBuilder<Ticket> builder) {

            builder.HasKey(t => t.Id); // (T maiúsculo, como no seu)

            builder.Property(t => t.ValorTicket)
                   .IsRequired()
                   .HasColumnType("decimal(18,2)"); // (Boa prática para dinheiro)

            builder.Property(t => t.DataEntrada)
                   .IsRequired();

            builder.Property(t => t.CodigoTicket)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(t => t.StatusTicket)
                   .IsRequired()
                   .HasDefaultValue(false); // (false = Ativo, true = Usado)
            
            // **** INÍCIO DA CORREÇÃO ****
            // Define explicitamente as Relações (Foreign Keys)
            // para resolver a ambiguidade

            // Relação 1: Ticket -> User
            builder.HasOne(t => t.User)           // Um Bilhete tem UM Utilizador
                   .WithMany()                 // Um Utilizador pode ter Muitos Bilhetes (mas não navegamos de volta)
                   .HasForeignKey(t => t.IdUsuario) // A chave estrangeira é 'IdUsuario'
                   .OnDelete(DeleteBehavior.Cascade); // Opcional: Se apagar o User, apaga o Bilhete

            // Relação 2: Ticket -> Evento
            builder.HasOne(t => t.Evento)         // Um Bilhete tem UM Evento
                   .WithMany()               // Um Evento pode ter Muitos Bilhetes (mas não navegamos de volta)
                   .HasForeignKey(t => t.IdEvento) // A chave estrangeira é 'IdEvento'
                   .OnDelete(DeleteBehavior.Cascade); // Opcional: Se apagar o Evento, apaga o Bilhete
            
            // **** FIM DA CORREÇÃO ****
        }
    }
}