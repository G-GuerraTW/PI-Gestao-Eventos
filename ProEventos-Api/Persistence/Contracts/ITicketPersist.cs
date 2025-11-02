using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.entities;

namespace Persistence.Contracts
{
    public interface ITicketPersist
    {
        public Task<Ticket[]> GetAllTicketByUsuario(int userId);
        public Task<Ticket> GetTicketsByIdAsync(int ticketId);
        public Task<Ticket> GetTicketByCodigoAsync(string codigo);
    }
}