using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs;

namespace Application.Contracts
{
    public interface ITicketService
    {
        public Task<TicketDTO> AddTicket(int userId, TicketDTO model);
        public Task<TicketDTO> UpdateTicket(int userId, int ticketId, TicketDTO model);
        public Task<bool> DeleteTicket(int userId, int usuarioId);
        public Task<TicketDTO[]> GetAllTicketByUsuario(int userId);
        Task<TicketDTO> GetTicketByIdAsync(int ticketId);
        Task<TicketDTO> GetTicketByCodigoAsync(string codigo);
        Task<TicketDTO> UsarTicketAsync(int ticketId);
    }
}