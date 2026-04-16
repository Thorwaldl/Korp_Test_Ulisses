using Microsoft.EntityFrameworkCore;
using estoque_service.Models;

namespace estoque_service.Data;

public class EstoqueDbContext : DbContext
{
    public EstoqueDbContext(DbContextOptions<EstoqueDbContext> options)
        : base(options)
    {
    }

    public DbSet<Product> Products => Set<Product>();
}