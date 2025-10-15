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