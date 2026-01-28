using Microsoft.EntityFrameworkCore;
using RickAndMortyBack.Models;

namespace RickAndMortyBack.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Character> Characters { get; set; }
    }
}
