namespace LibraryApp.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Book
{
    public int Id { get; set; }
    public string? Name { get; set; }

    public string? Description { get; set; }

    // public byte[]? Image { get; set; }
    [NotMapped]
    public IFormFile? Image { get; set; }

    public string? ImageUrl { get; set; }

    [DataType(DataType.Date)]
    public DateTime Date { get; set; }

    public string? CreatedBy { get; set; }

    public int AuthorId { get; set; }

    // many to manye

    public ICollection<BookCategory>? BookCategories { get; set; }
}

