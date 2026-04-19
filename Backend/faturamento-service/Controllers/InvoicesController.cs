using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using faturamento_service.Data;
using faturamento_service.Models;

using System.Net.Http;
using System.Text;
using System.Text.Json;

namespace faturamento_service.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvoicesController : ControllerBase
{
    private readonly FaturamentoDbContext _context;

    public InvoicesController(FaturamentoDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Invoice>>> GetAll()
    {
    return await _context.Invoices
        .Include(i => i.Itens)
        .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Invoice>> GetById(int id)
    {
        var invoice = await _context.Invoices
            .Include(i => i.Itens)
            .FirstOrDefaultAsync(i => i.Id == id);

        if (invoice == null)
            return NotFound();

        return invoice;
    }

    [HttpPost]
    public async Task<ActionResult<Invoice>> Create()
    {
        int nextNumber = 1;

        if (await _context.Invoices.AnyAsync())
        {
            nextNumber = await _context.Invoices.MaxAsync(i => i.Numero) + 1;
        }

        var invoice = new Invoice
        {
            Numero = nextNumber,
            Status = "ABERTA"
        };

        _context.Invoices.Add(invoice);
        await _context.SaveChangesAsync();

        return invoice;
    }

    [HttpPost("{invoiceId}/items")]
    public async Task<ActionResult> AddItem(int invoiceId, InvoiceItem item)
    {
    var invoice = await _context.Invoices.FindAsync(invoiceId);

    if (invoice == null)
        return NotFound("Nota não encontrada");

    if (invoice.Status != "ABERTA")
        return BadRequest("Não é possível alterar uma nota fechada");

    item.InvoiceId = invoiceId;

    _context.InvoiceItems.Add(item);
    await _context.SaveChangesAsync();

    return Ok(item);
    }

    [HttpPost("{id}/print")]
    public async Task<ActionResult> PrintInvoice(int id)
    {
        var invoice = await _context.Invoices
            .Include(i => i.Itens)
            .FirstOrDefaultAsync(i => i.Id == id);

        if (invoice == null)
            return NotFound("Nota não encontrada");

        if (invoice.Status != "ABERTA")
            return BadRequest("Apenas notas abertas podem ser impressas");

        var httpClient = new HttpClient();

        foreach (var item in invoice.Itens)
        {
            var url = $"http://localhost:5043/api/products/{item.ProdutoId}/decrease";

            var content = new StringContent(
                JsonSerializer.Serialize(item.Quantidade),
                Encoding.UTF8,
                "application/json"
            );

            HttpResponseMessage? response = null;
            int retries = 2;

            for (int i = 0; i <= retries; i++)
            {
                try
                {
                    response = await httpClient.PostAsync(url, content);
                    if (response.IsSuccessStatusCode)
                        break;
                }
                catch
                {
                }
            }

            if (response == null || !response.IsSuccessStatusCode)
            {
                return StatusCode(500, $"Erro ao atualizar estoque do produto {item.ProdutoId}");
            }
        }

        invoice.Status = "FECHADA";
        await _context.SaveChangesAsync();

        return Ok(invoice);
    }
}