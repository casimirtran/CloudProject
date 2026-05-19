using Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Api.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
public class QuotesController : ControllerBase {
    private readonly AppDbContext _db;
    public QuotesController(AppDbContext db) => _db = db;
    private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet] public IActionResult Get() => Ok(_db.Quotes.Where(q => q.UserId == UserId));
    [HttpPost] public IActionResult Post(Quote q) { 
        if(_db.Quotes.Count(x => x.UserId == UserId) >= 5) return BadRequest(); 
        q.UserId = UserId; _db.Quotes.Add(q); _db.SaveChanges(); return Ok(); 
    }
    [HttpPut("{id}")] public IActionResult Put(int id, Quote q) { 
        var ex = _db.Quotes.FirstOrDefault(x => x.Id == id && x.UserId == UserId); 
        if(ex == null) return NotFound(); 
        ex.Text = q.Text; _db.SaveChanges(); return Ok(); 
    }
    [HttpDelete("{id}")] public IActionResult Delete(int id) { 
        var ex = _db.Quotes.FirstOrDefault(x => x.Id == id && x.UserId == UserId); 
        if(ex == null) return NotFound(); 
        _db.Quotes.Remove(ex); _db.SaveChanges(); return Ok(); 
    }
}