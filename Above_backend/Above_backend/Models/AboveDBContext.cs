using Microsoft.EntityFrameworkCore;

namespace Above_backend.Models
{
    public class AboveDBContext : DbContext
    {
        public AboveDBContext(DbContextOptions<AboveDBContext> options) :base(options)
        { 
            
        }

        public DbSet<Classes> Classes { get; set; } = null!;
        public DbSet<SubClasses> SubClasses { get; set; } = null!;
        public DbSet<Features> Features { get; set; } = null!;
        public DbSet<Equipment> Equipment { get; set; } = null!;
        public DbSet<Races> Races { get; set; } = null!;
        public DbSet<Spells> Spells { get; set; } = null!;
    }
}
