using DAL.Entities;

using Microsoft.EntityFrameworkCore;

namespace DAL.EF;

public sealed class ApplicationDbContext:DbContext
{
  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
  {
    // Database.EnsureCreated();
  }
  public DbSet<Character> Characters { get; set; }
  public DbSet<UserText> UserTexts { get; set; }
}
