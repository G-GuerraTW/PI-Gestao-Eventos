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
            builder.Property(L => L.Nome).HasColumnType("TEXT");
            builder.Property(L => L.DataInicio).HasColumnType("DATETIME");
            builder.Property(L => L.DataFim).HasColumnType("DATETIME");
            builder.Property(L => L.Valor).HasColumnType("INTEGER");
            builder.Property(L => L.Quantidade).HasColumnType("INTEGER");
            
            builder.HasOne(L => L.Evento)
            .WithMany(E => E.Lotes)
            .HasForeignKey(L => L.EventoId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}