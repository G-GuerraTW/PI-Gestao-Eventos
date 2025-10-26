using API.Extensions;
using Application.DTOs;
using Application.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Threading.Tasks; 
using Microsoft.AspNetCore.Http; 

namespace API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChavePalestrantesController : ControllerBase
    {
        private readonly IChavePalestranteService _chaveService;
        private readonly IAccountService _accountService;

        public ChavePalestrantesController(IChavePalestranteService chaveService, 
                                           IAccountService accountService)
        {
            _accountService = accountService;
            _chaveService = chaveService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddChave() 
        {
            try
            { 
                var chave = await _chaveService.AddChavePalestrante(User.GetUserId(), null);

                if(chave != null) 
                {
                    return Ok(chave);
                }

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