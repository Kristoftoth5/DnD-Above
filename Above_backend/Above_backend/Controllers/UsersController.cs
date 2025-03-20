using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Above_backend.Models.DTOs;
using Above_backend.Models;

namespace Above_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<Users> _userManager;
        private readonly SignInManager<Users> _signInManager;

        public UsersController(UserManager<Users> userManager, SignInManager<Users> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UsersCreateDTO userscreatedto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = new Users
            {
                UserName = userscreatedto.UserName,
                Email = userscreatedto.Email,
                CreatedAt = DateTime.UtcNow,
            };

            var result = await _userManager.CreateAsync(user, userscreatedto.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new { Message = "User registered successfully!" });
        }
    }
}
