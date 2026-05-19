using Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Api.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
public class BooksController : ControllerBase {
    private readonly AppDbContext _db;
    public BooksController(AppDbContext db) => _db = db;
    private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet] public IActionResult Get() => Ok(_db.Books.Where(b => b.UserId == UserId));
    [HttpPost] public IActionResult Post(Book b) { b.UserId = UserId; _db.Books.Add(b); _db.SaveChanges(); return Ok(); }
    [HttpPut("{id}")] public IActionResult Put(int id, Book b) { 
        var ex = _db.Books.FirstOrDefault(x => x.Id == id && x.UserId == UserId); 
        if(ex == null) return NotFound(); 
        ex.Title = b.Title; ex.Author = b.Author; _db.SaveChanges(); return Ok(); 
    }
    [HttpDelete("{id}")] public IActionResult Delete(int id) { 
        var ex = _db.Books.FirstOrDefault(x => x.Id == id && x.UserId == UserId); 
        if(ex == null) return NotFound(); 
        _db.Books.Remove(ex); _db.SaveChanges(); return Ok(); 
    }
}