using Domain.entities;

namespace Application.DTOs
{
    public class PalestranteDTO
        {
            public int Id { get; set; }        
            public string Nome { get; set; }
            public string MiniCurriculo { get; set; }
            public int UserId { get; set; }
            public IEnumerable<RedeSocialDTO>? RedesSociais { get; set; } = new List<RedeSocialDTO>();
            public IEnumerable<EventoPalestrante>? EventosPalestrantes { get; set; } = new List<EventoPalestrante>();
        }
}