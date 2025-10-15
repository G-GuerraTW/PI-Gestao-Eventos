using Microsoft.AspNetCore.Identity;

namespace Domain.Identity
{
    public class Role : IdentityRole<int>
    {
        public IEnumerable<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }
}