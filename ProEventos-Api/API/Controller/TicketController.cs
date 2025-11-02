using API.Extensions; // Para o User.GetUserId()
using Application.Contracts;
using Application.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace API.Controller
{
    [Authorize] // Exige que o utilizador esteja logado para todos os métodos
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        // Injetar os serviços necessários, seguindo o seu padrão
        private readonly ITicketService _ticketService;
        private readonly IAccountService _accountService;

        public TicketController(ITicketService ticketService,
                                IAccountService accountService)
        {
            _ticketService = ticketService;
            _accountService = accountService;
        }

        /// <summary>
        /// Rota para criar um novo Bilhete (Ticket).
        /// O Angular vai chamar esta rota.
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> AddTicket([FromBody] TicketDTO model)
        {
            try
            {
                // O 'userId' é extraído do Token de autenticação
                var userId = User.GetUserId();

                // O 'model' (DTO) deve conter o IdEvento
                var ticket = await _ticketService.AddTicket(userId, model);

                if (ticket == null) return BadRequest("Erro ao tentar criar o bilhete.");

                return Ok(ticket);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar bilhete: {ex.Message}");
            }
        }

        /// <summary>
        /// Rota para atualizar um bilhete existente.
        /// </summary>
        [HttpPut("{ticketId}")]
        public async Task<IActionResult> UpdateTicket(int ticketId, [FromBody] TicketDTO model)
        {
            try
            {
                var userId = User.GetUserId();
                var ticket = await _ticketService.UpdateTicket(userId, ticketId, model);

                if (ticket == null) return BadRequest("Erro ao tentar atualizar o bilhete.");

                return Ok(ticket);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar bilhete: {ex.Message}");
            }
        }

        /// <summary>
        /// Rota para eliminar um bilhete.
        /// </summary>
        [HttpDelete("{ticketId}")]
        public async Task<IActionResult> DeleteTicket(int ticketId)
        {
            try
            {
                var userId = User.GetUserId();
                
                if (await _ticketService.DeleteTicket(userId, ticketId))
                    return Ok(new { message = "Bilhete eliminado com sucesso." });
                else
                    return BadRequest("Erro ao tentar eliminar o bilhete.");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar eliminar bilhete: {ex.Message}");
            }
        }

        /// <summary>
        /// Rota para "Minhas Entradas" - Busca todos os bilhetes do utilizador logado.
        /// </summary>
        [HttpGet("minhas-reservas")] // Rota que o Angular vai chamar
        public async Task<IActionResult> GetMinhasReservas()
        {
            try
            {
                var userId = User.GetUserId();
                var tickets = await _ticketService.GetAllTicketByUsuario(userId);

                if (tickets == null) return NoContent(); // Nenhum bilhete encontrado

                return Ok(tickets);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar bilhetes: {ex.Message}");
            }
        }

        /// <summary>
        /// Rota para buscar um bilhete específico por ID.
        /// </summary>
        [HttpGet("{ticketId}")]
        public async Task<IActionResult> GetTicketById(int ticketId)
        {
            try
            {
                var userId = User.GetUserId();
                var ticket = await _ticketService.GetTicketByIdAsync(ticketId);

                if (ticket == null) return NoContent(); // Nenhum bilhete encontrado

                return Ok(ticket);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar o bilhete: {ex.Message}");
            }
        }
    }
}
