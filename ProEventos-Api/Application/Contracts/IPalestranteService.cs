using Application.DTOs;
using Domain.entities;

namespace Application.Contracts
{
    public interface IPalestranteService
    {
        public Task<PalestranteDTO> AddPalestrante(PalestranteDTO model);
        public Task<PalestranteDTO> UpdatePalestrante(int PalestranteId, PalestranteDTO model);
        public Task<bool> DeletePalestrante(int PalestranteId);
        public Task<PalestranteDTO[]> GetAllPalestrantesAsync(bool IncludeEvento = false);
        public Task<PalestranteDTO[]> GetAllPalestrantesByNameAsync(string Name, bool IncludeEvento = false);
        public Task<PalestranteDTO> GetPalestranteByIdAsync(int Id, bool IncludeEvento = false);
    }
}