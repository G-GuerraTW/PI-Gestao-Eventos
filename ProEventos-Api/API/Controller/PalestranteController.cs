using Application.DTOs;
using Application.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class PalestranteController : ControllerBase
    {
        private readonly IPalestranteService _palestranteService;

        public PalestranteController(IPalestranteService palestranteService)
        {
            _palestranteService = palestranteService;
        }

        [HttpPost]
        public async Task<IActionResult> AddPalestrante(PalestranteDTO model)
        {
            try
            {
                if (model == null) return BadRequest("Erro ao tentar adicionar palestrante");
                var palestrante = await _palestranteService.AddPalestrante(model);
                if (palestrante != null) return Ok(palestrante);
                return BadRequest("Erro ao persistir cadastro no banco");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar palestrante. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePalestrante(int id, PalestranteDTO model)
        {
            var palestrante = await _palestranteService.UpdatePalestrante(id, model);
            if (palestrante == null) return BadRequest("Erro ao tentar atualizar palestrante");
            return Ok(palestrante);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePalestrante(int id)
        {
            try
            {
                if (id <= 0) return BadRequest("Erro ao tentar deletar palestrante");
                var resultado = await _palestranteService.DeletePalestrante(id);
                if (resultado) return Ok("Palestrante deletado");
                return BadRequest("Palestrante não deletado");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar palestrante. Erro: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetPalestrantes()
        {
            try
            {
                var palestrantes = await _palestranteService.GetAllPalestrantesAsync(false);
                if (palestrantes == null) return NoContent();
                return Ok(palestrantes);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar palestrantes. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPalestranteById(int id)
        {
            try
            {
                var palestrante = await _palestranteService.GetPalestranteByIdAsync(id, false);
                if (palestrante == null) return NoContent();
                return Ok(palestrante);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar palestrante. Erro: {ex.Message}");
            }
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetPalestranteByName(string name)
        {
            try
            {
                var palestrante = await _palestranteService.GetAllPalestrantesByNameAsync(name, false);
                if (palestrante == null) return NoContent();
                return Ok(palestrante);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar palestrantes por nome. Erro: {ex.Message}");
            }
        }
    }
}
