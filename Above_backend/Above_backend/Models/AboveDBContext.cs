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
        public DbSet<Equipment> Equipments { get; set; } = null!;
        public DbSet<Races> Races { get; set; } = null!;
        public DbSet<Spells> Spells { get; set; } = null!;
        public DbSet<Saves> Saves { get; set; } = null!;
        public DbSet<FeaturesToFeaturesConnection> FeaturesToFeaturesConnections { get; set; } = null!;

        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
        }
    }
}
