using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.entities;
using Microsoft.EntityFrameworkCore;
using Persistence.Context;
using Persistence.Contracts;

namespace Persistence.Repositories
{
    public class TicketPersist : ITicketPersist
    {
        private readonly ProEventoContext context;
        public TicketPersist(ProEventoContext context)
        {
            this.context = context;
        }
        public async Task<Ticket[]> GetAllTicketByUsuario(int userId)
        {
            return await context.Tickets
                .AsNoTracking()
                .Where(ticket => ticket.IdUsuario == userId)
                .ToArrayAsync();
        }

        public async Task<Ticket> GetTicketsByIdAsync(int ticketId)
        {
            return await context.Tickets.AsNoTracking().FirstOrDefaultAsync(ticket => ticket.Id == ticketId);
        }
    }
}