using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using estoque_service.Data;
using estoque_service.Models;

namespace estoque_service.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly EstoqueDbContext _context;

    public ProductsController(EstoqueDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetAll()
    {
        return await _context.Products.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetById(int id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null)
            return NotFound();

        return product;
    }

    [HttpPost]
    public async Task<ActionResult<Product>> Create(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    [HttpPost("{id}/decrease")]
    public async Task<ActionResult> DecreaseStock(int id, [FromBody] int quantidade)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null)
            return NotFound("Produto não encontrado");

        if (product.Saldo < quantidade)
        {
            if (product.Saldo == 999)//TEST
            {
                return StatusCode(500, "Falha simulada no serviço de estoque");
            }
            return BadRequest("Estoque insuficiente");
        }
        product.Saldo -= quantidade;

        await _context.SaveChangesAsync();

        return Ok(product);
    }
}