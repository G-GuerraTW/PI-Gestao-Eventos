using Persistence.Context;
using Persistence.Contracts;

namespace Persistence.Repositories
{
    public class GeralPersist : IGeralPersist
    {
        private readonly ProEventoContext context;
        public GeralPersist(ProEventoContext context)
        {
            this.context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            context.Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            context.Remove(entity);
        }

        public void DeleteRange<T>(T[] entity) where T : class
        {
            context.RemoveRange(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await context.SaveChangesAsync()) > 0;
        }
    }
}