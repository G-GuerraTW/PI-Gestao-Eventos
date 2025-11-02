using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Identity;

namespace Domain.entities
{
    public class Ticket
    {
        // Identificador único do ticket. Geralmente int ou Guid em C#.
        public int Id { get; set; } 
        
        // ID do evento ao qual o ticket pertence.
        public int IdEvento { get; set; } 
        
        // ID do usuário que possui o ticket.
        public int IdUsuario { get; set; } 
        
        // Valor do ticket. Decimal é recomendado para valores monetários.
        public decimal ValorTicket { get; set; } 
        
        // Data e hora de entrada associada ao ticket.
        public DateTime DataEntrada { get; set; } 
        
        // Código único do ticket (ex: QR code, código de barras).
        public string CodigoTicket { get; set; } 
        
        // Status atual do ticket (ex: "Vendido", "Validado", "Cancelado").
        public bool StatusTicket { get; set; } 

        public User User { get; set; }
        public Evento Evento { get; set; }
    }
}