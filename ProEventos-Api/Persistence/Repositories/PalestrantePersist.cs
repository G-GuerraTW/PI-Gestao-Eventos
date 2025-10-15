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