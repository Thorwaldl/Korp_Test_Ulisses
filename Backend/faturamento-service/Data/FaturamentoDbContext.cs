using Microsoft.EntityFrameworkCore;
using faturamento_service.Models;

namespace faturamento_service.Data;

public class FaturamentoDbContext : DbContext
{
    public FaturamentoDbContext(DbContextOptions<FaturamentoDbContext> options)
        : base(options)
    {
    }

    public DbSet<Invoice> Invoices => Set<Invoice>();
    public DbSet<InvoiceItem> InvoiceItems => Set<InvoiceItem>();
}