namespace Domain.entities
{
    public class EventoPalestrante
    {
        public int EventoId { get; set; }        
        public Evento Evento { get; set; }
        public int PalestranteId { get; set; }
        public Palestrante Palestrante { get; set; }
    }
}