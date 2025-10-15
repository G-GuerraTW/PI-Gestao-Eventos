using Domain.Identity;

namespace Persistence.Contracts
{
    public interface IUserPersist : IGeralPersist
    {
        public Task<IEnumerable<User>> GetUsersAsync();
        public Task<User> GetUserByIdAsync(int id);
        public Task<User> GetUserByUsernameAsync(string username);
    }
}