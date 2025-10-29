using Application.DTOs;
using Domain.entities;

namespace Application.Contracts
{
    public interface IEventoService
    {
        public Task<EventoDTO> AddEvento(int userId, EventoDTO model);
        public Task<EventoDTO> UpdateEvento(int userId, int EventoId,EventoDTO model);
        public Task<bool> DeleteEvento(int userId, int EventoId);
        public Task<EventoDTO[]> GetAllEventosAsync(int userId, bool IncludePalestrante = false);
        public Task<EventoDTO[]> GetAllEventosByTemaAsync(int userId, string Tema,bool IncludePalestrante = false);
        public Task<EventoDTO> GetEventoByIdAsync(int userId, int Id, bool IncludePalestrante = false);        
        public Task<EventoDTO[]> GetAllEventoPalestranteAsync(int userId);
    }
}