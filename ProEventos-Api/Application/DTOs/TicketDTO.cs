using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class TicketDTO
    {
        // ID é incluído no DTO de exibição
        public int Id { get; set; } 
        
        // ID do evento e do usuário
        public int IdEvento { get; set; } 
        public int IdUsuario { get; set; } 
        
        // Dados do ticket
        public decimal ValorTicket { get; set; } 
        public DateTime DataEntrada { get; set; } 
        public string CodigoTicket { get; set; } 
        public bool StatusTicket { get; set; }
    }
}