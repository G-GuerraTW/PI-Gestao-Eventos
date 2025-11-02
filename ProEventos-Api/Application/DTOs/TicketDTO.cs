using System;

namespace Application.DTOs
{
    // Esta DTO deve espelhar o seu modelo Ticket.ts
    public class TicketDTO
    {
        public int Id { get; set; }
        public int IdEvento { get; set; }
        public int IdUsuario { get; set; }
        public decimal ValorTicket { get; set; }
        public DateTime DataEntrada { get; set; }
        public string CodigoTicket { get; set; }
        
        // (O seu backend usa bool, o que está correto)
        public bool StatusTicket { get; set; } 
        public DateTime? DataUso { get; set; } // (Pode remover se não usou)

        // **** ADICIONE ESTAS DUAS LINHAS ****
        // O AutoMapper irá preencher isto se o seu TicketPersist
        // usar .Include(t => t.User) e .Include(t => t.Evento)
        public UserDTO User { get; set; }
        public EventoDTO Evento { get; set; }
        // *************************************
    }
}