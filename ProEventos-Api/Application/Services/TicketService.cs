using AutoMapper;
using Domain.entities;
using Application.DTOs;
using Application.Contracts;
using Persistence.Contracts;
using System; // Adicione este 'using' se estiver em falta
using System.Threading.Tasks; // Adicione este 'using' se estiver em falta

namespace Application.Services
{
    public class TicketService : ITicketService
    {
    private readonly IMapper _mapper;
        private readonly IGeralPersist _geralPersist;
        private readonly ITicketPersist _ticketPersist;
        private readonly IEventoPersist _eventoPersist;

        public TicketService(IMapper mapper,
                             IGeralPersist geralPersist,
                             ITicketPersist ticketPersist,
                             IEventoPersist eventoPersist)
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
                // 1. Lógica de Negócio (Buscar o evento)
                var evento = await _eventoPersist.GetEventoByParaTicketIdAsync(model.IdEvento);
                if (evento == null) throw new Exception("Evento não encontrado.");
                
                // **** CORREÇÃO AQUI ****
                // Em vez de '0', lemos o 'valor' do Evento.
                // Convertemos 'double' (do Evento) para 'decimal' (do Bilhete).
                decimal precoDoLote = (decimal)evento.valor; 
                // **********************

                // 2. Mapear DTO para Entidade
                var ticket = _mapper.Map<Ticket>(model);

                // 3. Definir propriedades de controlo
                ticket.IdUsuario = userId;
                ticket.ValorTicket = precoDoLote; // <-- Agora usa o valor correto
                ticket.DataEntrada = DateTime.Now;
                ticket.StatusTicket = false; // Define um estado inicial (bool)
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
                // 1. Buscar o bilhete
                var ticket = await _ticketPersist.GetTicketsByIdAsync(ticketId);
                if (ticket == null) return null;

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

                // NOTA: Aqui seria bom verificar se ticket.IdUsuario == userId
                // (O seu código atual permite um admin apagar bilhetes de outros)
                // if (ticket.IdUsuario != userId) throw new Exception("Acesso negado.");

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

        public async Task<TicketDTO> GetTicketByCodigoAsync(string codigo)
        {
            try
            {
                var ticket = await _ticketPersist.GetTicketByCodigoAsync(codigo);
                if (ticket == null) return null; 

                return _mapper.Map<TicketDTO>(ticket);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao recuperar bilhete por código: {ex.Message}");
            }
        }

        /// <summary>
        /// Marca um bilhete como "Utilizado" (StatusTicket = true).
        /// </summary>
        public async Task<TicketDTO> UsarTicketAsync(int ticketId)
        {
            try
            {
                // (Assumindo que GetTicketByIdAsync(id) existe no persist)
                var ticket = await _ticketPersist.GetTicketsByIdAsync(ticketId); 
                
                if (ticket == null) throw new Exception("Bilhete não encontrado.");
                
                // O seu backend usa 'bool' (false = Ativo, true = Usado)
                if (ticket.StatusTicket == true) throw new Exception("Este bilhete JÁ FOI UTILIZADO.");

                // **** ALTERAÇÃO AQUI ****
                // A Lógica de Negócio agora é mais simples
                ticket.StatusTicket = true; // Marca como usado
                // A linha 'ticket.DataUso = DateTime.Now;' foi REMOVIDA
                // ************************
                
                _geralPersist.Update(ticket);

                if (await _geralPersist.SaveChangesAsync())
                {
                    // Retorna o bilhete atualizado
                    return _mapper.Map<TicketDTO>(ticket);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao tentar utilizar o bilhete: {ex.Message}");
            }
        }
    }
}

