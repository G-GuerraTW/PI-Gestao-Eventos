
using Domain.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence.Context;
using Persistence.Contracts;
using Domain.Enum;

namespace Persistence.Repositories
{
    public class UserPersist : GeralPersist, IUserPersist
    {
        private readonly ProEventoContext context;
        public UserPersist(ProEventoContext context) : base(context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await context.Users.ToListAsync();
        }
        public async Task<User> GetUserByIdAsync(int id)
        {                               //faz uam pesquisa pela chave primaria, podendo ser chave primaria composta separando o parametro por > ",".  se não encontrar nada retornar null
            return await context.Users.FindAsync(id);
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await context.Users.SingleOrDefaultAsync(U => U.UserName == username);
        }

        public async Task<IEnumerable<User>> GetUsersPalestrantesAsync()
        {
            return await context.Users.Where(u => u.Funcao == Funcao.Palestrante).ToListAsync();
        }
    }
}