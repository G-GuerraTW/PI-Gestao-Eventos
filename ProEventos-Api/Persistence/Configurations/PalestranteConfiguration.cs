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
            builder.Property(P => P.Nome).HasColumnType("TEXT");
            builder.Property(P => P.MiniCurriculo).HasColumnType("TEXT");
            
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