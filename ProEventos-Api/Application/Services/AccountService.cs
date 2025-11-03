using Application.Contracts;
using Application.DTOs;
using AutoMapper;
using Domain.entities;
using Domain.Enum;
using Domain.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence.Contracts;

namespace Application.Services
{
    public class AccountService : IAccountService
    {
        private readonly IMapper mapper;
        private readonly UserManager<User> userManager;
        private readonly IUserPersist userPersist;
        private readonly SignInManager<User> signInManager;
        private readonly IGeralPersist geralPersist;
        private readonly IChavePalestrantesPersist chavePersist;

        public AccountService(UserManager<User> userManager, SignInManager<User> signInManager,
            IMapper mapper, IUserPersist userPersist, IGeralPersist geralPersist, IChavePalestrantesPersist chavePersist)
        {
            this.userManager = userManager;
            this.mapper = mapper;
            this.userPersist = userPersist;
            this.signInManager = signInManager;
            this.geralPersist = geralPersist;
            this.chavePersist = chavePersist;

        }

        public async Task<IEnumerable<UserUpdateDTO>> GetPalestrantes()
        {
            try
            {
                var users = await userPersist.GetUsersPalestrantesAsync();

                return mapper.Map<IEnumerable<UserUpdateDTO>>(users);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao tentar Recuperar pelestrantes. Erro: {ex.Message}");
            }
        }


        public async Task<SignInResult> CheckUserPasswordAsync(UserUpdateDTO userUpdateDTO, string password)
        {
            try
            {
                var user = await userManager.Users.SingleOrDefaultAsync(U => U.UserName == userUpdateDTO.UserName);
                return await signInManager.CheckPasswordSignInAsync(user, password, false);
            }
            catch (Exception ex)
            {

                throw new Exception($"Erro ao tentar verificar password. Erro: {ex.Message}");
            }
        }

        public async Task<UserDTO> CreateAccountAssync(UserDTO userDTO)
        {
            try
            {
                var user = mapper.Map<User>(userDTO);
                ChavePalestrantes chave = null;

                if (!string.IsNullOrWhiteSpace(userDTO.ChavePalestrante))
                {
                    chave = await chavePersist.GetChavePalestranteByChaveAsync(userDTO.ChavePalestrante);

                    if (chave == null || chave.Utilizada)
                    {
                        throw new Exception("Chave de Palestrante inválida ou já utilizada.");
                    }

                    user.Funcao = Funcao.Palestrante;
                }
                else
                {
                    user.Funcao = Funcao.Participante;
                }

                var result = await userManager.CreateAsync(user, userDTO.Password);

                if (result.Succeeded)
                {
                    if (chave != null)
                    {
                        chave.Utilizada = true;
                        chave.DataUso = DateTime.Now;
                        chave.UserId = user.Id;

                        geralPersist.Update(chave);
                        if (!await geralPersist.SaveChangesAsync())
                        {
                            throw new Exception("Usuário criado, mas falha ao atualizar o status da Chave Palestrante.");
                        }
                    }

                    var userRetorno = mapper.Map<UserDTO>(user);
                    return userRetorno;
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao tentar Criar Conta. Erro: {ex.Message}");
            }
        }

        public async Task<UserUpdateDTO> GetUserByUsernameAsync(string username)
        {
            try
            {
                var user = await userManager.FindByNameAsync(username);

                if (user == null) return null;

                var userRetorno = mapper.Map<UserUpdateDTO>(user);
                return userRetorno;
            }
            catch (Exception ex)
            {

                throw new Exception($"Erro ao tentar Recuperar Usuario. Erro: {ex.Message}");
            }
        }

        public async Task<UserUpdateDTO> UpdateAccount(UserUpdateDTO userUpdateDTO)
        {
            try
            {
                var user = await userPersist.GetUserByUsernameAsync(userUpdateDTO.UserName);
                if (user == null) return null;

                var token = await userManager.GeneratePasswordResetTokenAsync(user);
                var result = await userManager.ResetPasswordAsync(user, token, userUpdateDTO.Password);

                mapper.Map(userUpdateDTO, user);
                userPersist.Update(user);

                if (await userPersist.SaveChangesAsync())
                {
                    var userRetorno = await userPersist.GetUserByUsernameAsync(user.UserName);
                    return mapper.Map<UserUpdateDTO>(userRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {

                throw new Exception($"Erro ao tentar Atualizar Cadastro. Erro: {ex.Message}");
            }
        }

        public async Task<bool> UserExists(string username)
        {
            try
            {
                return await userManager.Users.AnyAsync(U => U.UserName == username);
            }
            catch (Exception ex)
            {

                throw new Exception($"Erro ao tentar verificar Username. Erro: {ex.Message}");
            }
        }
    }
}