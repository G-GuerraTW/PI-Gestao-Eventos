using Domain.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.entities;

namespace Persistence.Configurations
{
    public class TicketConfiguration : IEntityTypeConfiguration<Ticket>
    {
        public void Configure(EntityTypeBuilder<Ticket> builder) {

            builder.HasKey(T => T.Id);

            builder.Property(T => T.ValorTicket)
                .IsRequired();

            builder.Property(T => T.DataEntrada)
                .IsRequired();

            builder.Property(T => T.CodigoTicket)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(T => T.StatusTicket)
                .IsRequired()
                .HasDefaultValue(false);
        }
    }
}