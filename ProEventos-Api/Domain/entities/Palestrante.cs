using Domain.Identity;

namespace Domain.entities
{
    public class Palestrante
    {
        public int Id { get; set; }        
        public string Nome { get; set; }
        public string MiniCurriculo { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public IEnumerable<RedeSocial> RedesSociais { get; set; } = new List<RedeSocial>();
        public IEnumerable<EventoPalestrante> EventosPalestrantes { get; set; } = new List<EventoPalestrante>();
    }
}