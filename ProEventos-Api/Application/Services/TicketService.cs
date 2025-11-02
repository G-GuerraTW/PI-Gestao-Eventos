using AutoMapper;
using Domain.entities;
using Application.DTOs;
using Application.Contracts;
using Persistence.Contracts;

namespace Application.Services
{
    public class TicketService : ITicketService
    {
    private readonly IMapper _mapper;
        private readonly IGeralPersist _geralPersist;
        private readonly ITicketPersist _ticketPersist;
        // Pode precisar de injetar IEventoPersist se o preço do bilhete
        // vier de um Lote do Evento
        private readonly IEventoPersist _eventoPersist;

        public TicketService(IMapper mapper,
                             IGeralPersist geralPersist,
                             ITicketPersist ticketPersist,
                             IEventoPersist eventoPersist) // Adicionada injeção
        {
            _mapper = mapper;
            _geralPersist = geralPersist;
            _ticketPersist = ticketPersist;
            _eventoPersist = eventoPersist;
        }

        /// <summary>
        /// Adiciona um novo Bilhete. O DTO deve conter o IdEvento.
        /// </summary>
        public async Task<TicketDTO> AddTicket(int userId, TicketDTO model)
        {
            try
            {
                // 1. Lógica de Negócio (Exemplo: buscar o preço do evento)
                var evento = await _eventoPersist.GetEventoByIdAsync(userId, model.IdEvento, false);
                if (evento == null) throw new Exception("Evento não encontrado.");
                
                // (Aqui você pode adicionar lógicas mais complexas,
                // como buscar o preço do lote atual, etc.)
                // Por agora, vamos usar um valor fixo ou 0.
                decimal precoDoLote = 0; // Substitua pela sua lógica de Lotes

                // 2. Mapear DTO para Entidade
                var ticket = _mapper.Map<Ticket>(model);

                // 3. Definir propriedades de controlo
                ticket.IdUsuario = userId;
                ticket.ValorTicket = precoDoLote; 
                ticket.DataEntrada = DateTime.Now;
                ticket.StatusTicket = false; // Define um estado inicial
                ticket.CodigoTicket = Guid.NewGuid().ToString().Substring(0, 8).ToUpper();

                // 4. Persistir
                _geralPersist.Add(ticket);

                if (await _geralPersist.SaveChangesAsync())
                {
                    // 5. Re-buscar o objeto completo (padrão do seu EventoService)
                    var ticketRetorno = await _ticketPersist.GetTicketsByIdAsync(ticket.Id);
                    return _mapper.Map<TicketDTO>(ticketRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao persistir o cadastro do bilhete: {ex.Message}");
            }
        }

        /// <summary>
        /// Atualiza um Bilhete.
        /// </summary>
        public async Task<TicketDTO> UpdateTicket(int userId, int ticketId, TicketDTO model)
        {
            try
            {
                // 1. Buscar o bilhete (o repositório deve verificar a posse do userId)
                var ticket = await _ticketPersist.GetTicketsByIdAsync(ticketId);
                if (ticket == null) return null; // Ou throw new Exception

                // 2. Garantir consistência dos IDs
                model.Id = ticketId;
                model.IdUsuario = userId;

                // 3. Mapear as alterações do DTO (model) para a entidade (ticket)
                _mapper.Map(model, ticket);

                // 4. Persistir
                _geralPersist.Update(ticket);

                if (await _geralPersist.SaveChangesAsync())
                {
                    // 5. Re-buscar o objeto completo
                    var ticketRetorno = await _ticketPersist.GetTicketsByIdAsync(ticket.Id);
                    return _mapper.Map<TicketDTO>(ticketRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao persistir a atualização do bilhete: {ex.Message}");
            }
        }

        /// <summary>
        /// Elimina um Bilhete.
        /// </summary>
        public async Task<bool> DeleteTicket(int userId, int ticketId)
        {
            try
            {
                var ticket = await _ticketPersist.GetTicketsByIdAsync(ticketId);
                if (ticket == null) throw new Exception("Bilhete não encontrado ou não pertence ao utilizador.");

                _geralPersist.Delete(ticket);
                return await _geralPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao eliminar o bilhete: {ex.Message}");
            }
        }

        /// <summary>
        /// Obtém todos os bilhetes de um utilizador (para "Minhas Entradas").
        /// </summary>
        public async Task<TicketDTO[]> GetAllTicketByUsuario(int userId)
        {
            try
            {
                var tickets = await _ticketPersist.GetAllTicketByUsuario(userId);
                if (tickets == null) return null;

                return _mapper.Map<TicketDTO[]>(tickets);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao recuperar bilhetes por utilizador: {ex.Message}");
            }
        }

        /// <summary>
        /// Obtém um bilhete específico por ID.
        /// </summary>
        public async Task<TicketDTO> GetTicketByIdAsync(int ticketId)
        {
            try
            {
                var ticket = await _ticketPersist.GetTicketsByIdAsync(ticketId);
                if (ticket == null) return null;

                return _mapper.Map<TicketDTO>(ticket);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao recuperar bilhete por ID: {ex.Message}");
            }
        }
    }
}