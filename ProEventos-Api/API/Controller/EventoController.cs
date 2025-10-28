using API.Extensions;
using Application.DTOs;
using Application.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly IEventoService _eventoSerivce;
        private readonly IAccountService accountService;
        public EventoController(IEventoService _eventoSerivce, IAccountService accountService)
        {
            this.accountService = accountService;
            this._eventoSerivce = _eventoSerivce;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddEvento(EventoDTO model) 
        {
            try
            {
                if(model == null) return BadRequest("Erro ao tentar adicionar evento");
                //var evento = await _eventoSerivce.AddEvento(User.GetUserId(), model);
                var evento = await _eventoSerivce.AddEvento(User.GetUserId(), model);
                if(evento != null) return Ok(evento);
                return BadRequest("Erro ao persistir cadastro ao banco");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar eventos. Erro: {ex.Message}"
                );
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvento(int id, EventoDTO model) 
        {
            //var evento = await _eventoSerivce.UpdateEvento(User.GetUserId(), id, model); 
            var evento = await _eventoSerivce.UpdateEvento(User.GetUserId(), id, model);
            if(evento == null) return BadRequest("Erro ao tentar adicionar evento");
            return Ok(evento);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvento(int Id) 
        {
            try
            {
                if(Id == null || Id < 0) return BadRequest("Erro ao tentar deletar usuario");
                //var resultado = await _eventoSerivce.DeleteEvento(User.GetUserId(), Id);
                var resultado = await _eventoSerivce.DeleteEvento(User.GetUserId(), Id);

                if(resultado) return Ok("Evento deletado");
                return BadRequest("Evento não deletado");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar eventos. Erro: {ex.Message}"
                );
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetEventos() 
        {
            try
            {
                var eventos = await _eventoSerivce.GetAllEventosAsync(User.GetUserId(), false);
                if (eventos == null) return NoContent();
                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventoById(int id)
        {
            try
            {
                //var eventos = await _eventoSerivce.GetEventoByIdAsync(User.GetUserId(), id, false);
                var eventos = await _eventoSerivce.GetEventoByIdAsync(User.GetUserId(), id, false);
                if(eventos == null) return NoContent();
                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [Authorize]
        [HttpGet("tema/")]
        public async Task<IActionResult> GetEventoByTema(string tema)
        {
            try
            {
                var evento = await _eventoSerivce.GetAllEventosByTemaAsync(User.GetUserId(), tema, false);
                if (evento == null) return NoContent();
                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tenhtar recuperar eventos. Erro: {ex.Message}"
                );
            }
        }
        
        [Authorize]
        [HttpGet("todos/")]
        public async Task<IActionResult> GetAllEventosAsync() 
        {
            try
            {
                var evento = await _eventoSerivce.GetAllEventosAsync(User.GetUserId(), false);
                if(evento == null) return NoContent();
                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}"
                );
            }
        }
    }
}