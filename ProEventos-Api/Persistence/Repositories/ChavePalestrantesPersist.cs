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



    public async Task<ChavePalestrantes> GetChavePalestranteByIdAsync(int Id)
    {

        IQueryable<ChavePalestrantes> query = context.ChavePalestrantes;

        query = query.AsNoTracking()
                     .Where(c => c.Id == Id);

        return await query.FirstOrDefaultAsync();
    }
        }
    }