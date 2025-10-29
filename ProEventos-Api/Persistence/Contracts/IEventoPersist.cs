using Domain.entities;

namespace Persistence.Contracts
{
    public interface IEventoPersist
    {
        public Task<Evento[]> GetAllEventosAsync(int userId, bool IncludePalestrante = false);
        public Task<Evento[]> GetAllEventosByTemaAsync(int userId, string Tema,bool IncludePalestrante = false);
        public Task<Evento> GetEventoByIdAsync(int userId, int Id, bool IncludePalestrante = false);
        public Task<Evento[]> GetAllEventoPalestranteAsync(int userId);
    }
}