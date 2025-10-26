using Domain.entities;
using Persistence.Context;
using Persistence.Contracts;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories
{
    public class ChavePalestrantesPersist : IChavePalestrantesPersist
    {
        public ProEventoContext context { get; }
        public ChavePalestrantesPersist(ProEventoContext context)
        {
            this.context = context;
        }



// Na classe ChavePalestrantesPersist.cs
        public async Task<ChavePalestrantes> GetChavePalestranteByChaveAsync(string chave)
        {
            return await context.ChavePalestrantes.FirstOrDefaultAsync(C => C.Chave == chave);
        }
    }
}