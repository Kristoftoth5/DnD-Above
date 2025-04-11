using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Scripting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Above_backend.Models;
using Above_backend.Models.DTOs;
using Above_backend.Helpers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AboveDBContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(AboveDBContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<UsersDisplayDTO>> GetUserInfo(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        return MappingUsers.UserToUserDisplayDTO(user);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDTO user)
    {
        if (await _context.Users.AnyAsync(u => u.Email == user.Email))
            return BadRequest("User already exists.");

        _context.Users.Add(MappingUsers.RegisterUserToUser(user));
        await _context.SaveChangesAsync();

        return Ok(new { message = "User registered successfully." });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO model)
    {
        var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == model.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
            return Unauthorized("Invalid credentials.");

        var token = GenerateJwtToken(user);
        var refreshToken = GenerateRefreshToken(user.Id);

        _context.RefreshTokens.Add(refreshToken);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            UserId = user.Id,
            Token = token,
            RefreshToken = refreshToken.Token
        });
    }

    [Authorize]
    [HttpPost("refreshToken")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenDTO model)
    {
        var refreshToken = await _context.RefreshTokens
            .Include(rt => rt.User)
            .SingleOrDefaultAsync(rt => rt.Token == model.Token);

        if (refreshToken == null || refreshToken.Expires < DateTime.UtcNow)
            return Unauthorized("Invalid or expired refresh token.");

        var newToken = GenerateJwtToken(refreshToken.User);
        var newRefreshToken = GenerateRefreshToken(refreshToken.User.Id);

        _context.RefreshTokens.Remove(refreshToken);
        _context.RefreshTokens.Add(newRefreshToken);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            Token = newToken,
            RefreshToken = newRefreshToken.Token
        });
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout([FromBody] RefreshTokenDTO model)
    {
        var refreshToken = await _context.RefreshTokens.SingleOrDefaultAsync(rt => rt.Token == model.Token);

        if (refreshToken != null)
        {
            _context.RefreshTokens.Remove(refreshToken);
            await _context.SaveChangesAsync();
        }

        return Ok(new { message = "Logged out successfully." });
    }

    private string GenerateJwtToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, user.Email),
            }),
            Expires = DateTime.UtcNow.AddMinutes(_configuration.GetValue<int>("Jwt:ExpireMinutes")),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            Issuer = _configuration["Jwt:Issuer"],
            Audience = _configuration["Jwt:Audience"]
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }

    private RefreshToken GenerateRefreshToken(int userId)
    {
        return new RefreshToken
        {
            Token = Guid.NewGuid().ToString(),
            Expires = DateTime.UtcNow.AddDays(_configuration.GetValue<int>("Jwt:RefreshExpireDays")),
            UserId = userId
        };
    }
}