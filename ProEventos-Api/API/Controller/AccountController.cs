using API.Extensions;
using Application.DTOs;
using Application.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controller
{   
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly ITokenService tokenService;
        private readonly IAccountService accountService;
        public AccountController(IAccountService accountService, ITokenService tokenService)
        {
            this.tokenService = tokenService;
            this.accountService = accountService;
        }

        [HttpGet("GetUser")]
        public async Task<IActionResult> GetUser()
        {
            try
            {
                var userName = User.GetUserName();
                var user = await this.accountService.GetUserByUsernameAsync(userName);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Usuário. Erro: {ex.Message}");
            }
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> RegisterUser(UserDTO userDTO)
        {
            try
            {
                if (await accountService.UserExists(userDTO.UserName)) return BadRequest("Usuario já Existe");

                var user = await accountService.CreateAccountAssync(userDTO);
                if(user != null) return Ok(user);

                return BadRequest("Usuário não criado, tente novamente.");

            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Usuário. Erro: {ex.Message}");
            }
        }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateUser(UserUpdateDTO userUpdateDTO)
        {
            try
            {
                var user = await accountService.GetUserByUsernameAsync(User.GetUserName());
                if(user == null) return Unauthorized("Usuário Inválido.");

                var userReturn = await accountService.UpdateAccount(userUpdateDTO);
                if(userReturn != null) return Ok(userReturn);
                else return BadRequest("Erro ao alterar Usuário.");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar alterar Usuário. Erro: {ex.Message}");
            }
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(UserLoginDTO userLogin)
        {
            try
            {
                var user = await this.accountService.GetUserByUsernameAsync(userLogin.UserName);
                if(user == null) return Unauthorized("Usuário ou senha está errado.");

                var result = await accountService.CheckUserPasswordAsync(user, userLogin.Password);
                if(!result.Succeeded) return Unauthorized();

                return Ok(new 
                {
                    userName = user.UserName,
                    PrimeiroNome = user.PrimeiroNome,
                    Funcao = user.Funcao,
                    Titulo = user.Titulo,
                    token = tokenService.CreateToken(user).Result
                });
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Usuário. Erro: {ex.Message}");
            }
        }
    }
}