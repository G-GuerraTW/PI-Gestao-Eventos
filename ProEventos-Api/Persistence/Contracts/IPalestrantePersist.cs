using Domain.entities;

namespace Persistence.Contracts
{
    public interface IPalestrantePersist
    {
        public Task<Palestrante[]> GetAllPalestrantesAsync(bool IncludeEvento = false);
        public Task<Palestrante[]> GetAllPalestrantesByNameAsync(string Name, bool IncludeEvento = false);
        public Task<Palestrante> GetPalestranteByIdAsync(int Id, bool IncludeEvento = false);
    }
}