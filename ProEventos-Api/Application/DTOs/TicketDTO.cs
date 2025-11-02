using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class TicketDTO
    {
public int Id { get; set; }

    [Required]
    public int IdEvento { get; set; }
    public int IdUsuario { get; set; }
    public decimal ValorTicket { get; set; }
    public DateTime DataEntrada { get; set; }
    public string CodigoTicket { get; set; }
    public string StatusTicket { get; set; }
    }
}