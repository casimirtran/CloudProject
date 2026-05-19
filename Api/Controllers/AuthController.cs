using Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Api.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase {
    private readonly AppDbContext _db;
    private readonly IConfiguration _cfg;
    public AuthController(AppDbContext db, IConfiguration cfg) { _db = db; _cfg = cfg; }

    [HttpGet("wake-up"), AllowAnonymous]
    public IActionResult WakeUp() => Ok();

    [HttpPost("register"), AllowAnonymous]
    public IActionResult Register(User u) {
        if(_db.Users.Any(x => x.Username == u.Username)) return BadRequest();
        _db.Users.Add(u); _db.SaveChanges(); return Ok();
    }

    [HttpPost("login"), AllowAnonymous]
    public IActionResult Login(User u) {
        var user = _db.Users.FirstOrDefault(x => x.Username == u.Username && x.PasswordHash == u.PasswordHash);
        if(user == null) return Unauthorized();
        
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_cfg["JwtSecret"]!);
        var tokenDescriptor = new SecurityTokenDescriptor {
            Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()) }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        return Ok(new { token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor)) });
    }
}