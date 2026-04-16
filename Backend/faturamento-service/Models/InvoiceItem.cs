namespace faturamento_service.Models;

using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

public class InvoiceItem
{
    public int Id { get; set; }

    public int InvoiceId { get; set; }

    [JsonIgnore]
    [ValidateNever]
    public Invoice Invoice { get; set; } = null!;

    public int ProdutoId { get; set; }
    public int Quantidade { get; set; }
}