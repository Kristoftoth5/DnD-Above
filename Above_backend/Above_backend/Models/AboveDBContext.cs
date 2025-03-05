using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


namespace Above_backend.Models
{
    public class AboveDBContext : IdentityDbContext<IdentityUser>
    {
        public AboveDBContext(DbContextOptions<AboveDBContext> options) :base(options)
        { 
            
        }

        public DbSet<Classes> Classes { get; set; } = null!;
        public DbSet<SubClasses> SubClasses { get; set; } = null!;
        public DbSet<Features> Features { get; set; } = null!;
        public DbSet<Equipment> Equipments { get; set; } = null!;
        public DbSet<Races> Races { get; set; } = null!;
        public DbSet<Spells> Spells { get; set; } = null!;
        public DbSet<Users> Users { get; set; } = null!;
        public DbSet<Saves> Saves { get; set; } = null!;
    }
}
