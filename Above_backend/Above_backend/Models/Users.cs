using Microsoft.AspNetCore.Identity;

namespace Above_backend.Models
{
    public class Users : IdentityUser
    {
        public DateTime CreatedAt { get; set; }
    }
}
