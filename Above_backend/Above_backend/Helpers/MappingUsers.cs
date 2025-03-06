using Above_backend.Models.DTOs;
using Above_backend.Models;

namespace Above_backend.Helpers
{
    public class MappingUsers
    {
        public static Users UsersCreateDTOToUsers(UsersCreateDTO userscreatedto)
        {
            return new Users
            {
                UserName = userscreatedto.UserName,
                Password = userscreatedto.Password,
                Email = userscreatedto.Email,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };
        }
        public static UsersDisplayDTO UsersToUsersDisplayDTO(Users users)
        {
            return new UsersDisplayDTO
            {
                UserName = users.UserName,
                Email = users.Email,
                CreatedAt = users.CreatedAt,
                UpdatedAt = users.UpdatedAt,
            };
        }
    }
}
