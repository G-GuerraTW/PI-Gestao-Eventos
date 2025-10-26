using Domain.entities;

namespace Persistence.Contracts
{
    public interface IChavePalestrantesPersist
    {
        Task<ChavePalestrantes> GetChavePalestranteByChaveAsync(string chave);
    }
}