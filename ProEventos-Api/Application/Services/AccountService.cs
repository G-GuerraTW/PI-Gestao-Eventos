using AutoMapper;
using Domain.Identity;
using Application.DTOs;
using Application.Contracts;
using Persistence.Contracts;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class AccountService : IAccountService
    {
        private readonly IMapper mapper;
        private readonly UserManager<User> userManager;
        private readonly IUserPersist userPersist;
        private readonly SignInManager<User> signInManager;

        public AccountService(UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper, IUserPersist userPersist)
        {
            this.userManager = userManager;
            this.mapper = mapper;
            this.userPersist = userPersist;
            this.signInManager = signInManager;
            
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
                var result = await userManager.CreateAsync(user, userDTO.Password);

                if(result.Succeeded) 
                {
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

                if(user == null) return null;

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
                if(user == null) return null;

                var token = await userManager.GeneratePasswordResetTokenAsync(user);
                var result = await userManager.ResetPasswordAsync(user, token, userUpdateDTO.Password);

                mapper.Map(userUpdateDTO, user);
                userPersist.Update(user);

                if(await userPersist.SaveChangesAsync()) 
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