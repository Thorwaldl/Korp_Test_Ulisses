namespace faturamento_service.Models;

public class Invoice
{
    public int Id { get; set; }
    public int Numero { get; set; }
    public string Status { get; set; } = "ABERTA";

    public List<InvoiceItem> Itens { get; set; } = new();
}