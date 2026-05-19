using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api;
public class AppDbContext : DbContext {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<User> Users { get; set; }
    public DbSet<Book> Books { get; set; }
    public DbSet<Quote> Quotes { get; set; }
}