using Above_backend.Models.DTOs;
using Above_backend.Models;

namespace Above_backend.Helpers
{
    public class MappingUsers
    {
        public static UsersDisplayDTO UserToUserDisplayDTO(User user)
        {
            return new UsersDisplayDTO
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                CreatedAt = System.DateTime.Now,
                UpdatedAt = System.DateTime.Now,
            };
        }

        public static User RegisterUserToUser(RegisterDTO userregisterdto)
        {
            return new User
            {
                UserName = userregisterdto.UserName,
                Email = userregisterdto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(userregisterdto.Password),
                CreatedAt = System.DateTime.Now,
                UpdatedAt = System.DateTime.Now,
            };
        }
    }
}
