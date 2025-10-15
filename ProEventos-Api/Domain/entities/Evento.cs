using Domain.Identity;

namespace Domain.entities
{
    public class Evento
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public string Tema { get; set; }
        public DateTime? DataEvento { get; set; }
        public int QtdPessoas { get; set; }
        public string ImagemURL { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public IEnumerable<Lote> Lotes { get; set; } = new List<Lote>();
        public IEnumerable<RedeSocial> RedesSociais { get; set; } = new List<RedeSocial>();
        public IEnumerable<EventoPalestrante> EventosPalestrantes { get; set; } = new List<EventoPalestrante>();

        public int UserId { get; set; }
        public User User { get; set; }
    }
}