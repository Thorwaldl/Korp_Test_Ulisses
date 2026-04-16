namespace estoque_service.Models;

public class Product
{
    public int Id { get; set; }
    public string Codigo { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public int Saldo { get; set; }
}