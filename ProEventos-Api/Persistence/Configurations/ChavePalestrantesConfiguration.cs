using Domain.entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class ChavePalestrantesConfiguration : IEntityTypeConfiguration<ChavePalestrantes>
    {

        public void Configure(EntityTypeBuilder<ChavePalestrantes> builder)
        {
            builder.ToTable("ChavePalestrantes");
            builder.HasKey(L => L.Id);
            builder.Property(L => L.Utilizada).HasColumnType("BOOL");

        }
    }
}