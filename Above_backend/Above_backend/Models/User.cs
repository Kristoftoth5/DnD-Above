<<<<<<<< HEAD:Above_backend/Above_backend/Models/User.cs
﻿using System.Data;

namespace Above_backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
========
﻿using Microsoft.AspNetCore.Identity;

namespace Above_backend.Models
{
    public class Users : IdentityUser
    {
>>>>>>>> progress:Above_backend/Above_backend/Models/Users.cs
        public DateTime CreatedAt { get; set; }
    }
}
