using Domain.entities;

namespace Persistence.Contracts
{
    public interface IChavePalestrantesPersist
    {
        public Task<ChavePalestrantes> GetChavePalestranteByIdAsync(int Id);
    }
}