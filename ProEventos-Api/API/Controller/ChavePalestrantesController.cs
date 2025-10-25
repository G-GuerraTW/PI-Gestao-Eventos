// No arquivo API/Controller/ChavePalestrantesController.cs

using API.Extensions;
using Application.DTOs;
using Application.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System; // Necessário para Exception
using System.Threading.Tasks; // Necessário para Task
using Microsoft.AspNetCore.Http; // Necessário para StatusCodes

namespace API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChavePalestrantesController : ControllerBase
    {
        // Injeta os serviços necessários, igual ao EventoController
        private readonly IChavePalestranteService _chaveService;
        private readonly IAccountService _accountService;

        public ChavePalestrantesController(IChavePalestranteService chaveService, 
                                           IAccountService accountService)
        {
            _accountService = accountService;
            _chaveService = chaveService;
        }

        /// <summary>
        /// Endpoint para criar uma nova chave de palestrante.
        /// </summary>
        [HttpPost]
        //[Authorize]
        public async Task<IActionResult> AddChave(ChavePalestrantesDTO model) 
        {
            try
            {
                if(model == null) return BadRequest("Erro ao tentar adicionar chave");
                
                //var chave = await _chaveService.AddChavePalestrante(User.GetUserId(), model);
                var chave = await _chaveService.AddChavePalestrante(1, model); // Usando '1' como no seu exemplo

                if(chave != null) return Ok(chave);
                return BadRequest("Erro ao persistir cadastro da chave ao banco");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar chave. Erro: {ex.Message}"
                );
            }
        }
    }
}