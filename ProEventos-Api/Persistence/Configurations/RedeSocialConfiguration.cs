using Domain.entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class RedeSocialConfiguration : IEntityTypeConfiguration<RedeSocial>
    {
        public void Configure(EntityTypeBuilder<RedeSocial> builder)
        {
            builder.ToTable("RedeSocial");
            builder.HasKey(R => R.Id);
            builder.Property(R => R.Nome).HasColumnType("TEXT");
            builder.Property(R => R.URL).HasColumnType("TEXT");
            
            builder.HasOne(R => R.Evento)
            .WithMany(E => E.RedesSociais)
            .HasForeignKey(R => R.EventoId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(R => R.Palestrante)
            .WithMany(P => P.RedesSociais)
            .HasForeignKey(R => R.PalestranteId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}