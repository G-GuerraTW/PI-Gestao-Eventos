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

        public async Task<Ticket> GetTicketByCodigoAsync(string codigo)
        {
            IQueryable<Ticket> query = this.context.Tickets // (Use o seu DbContext aqui)
                .Include(t => t.User)     // <-- Mude de 'IdUsuario' para 'User'
                .Include(t => t.Evento);  // <-- Mude de 'IdEvento' para 'Evento'
                // ************************

            return await query.AsNoTracking()
                              .FirstOrDefaultAsync(t => t.CodigoTicket.ToUpper() == codigo.ToUpper());
        }
    }
}