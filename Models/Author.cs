
namespace LibraryApp.Models;
using System.ComponentModel.DataAnnotations;

public class Author
{
    // public int Id { get; set; }

    public string? Name { get; set; }
    public string? Bio { get; set; }

    [DataType(DataType.Date)]
    public DateTime createdAt { get; set; }

    public string? CreatedBy { get; set; }

    public List<Book> Books { get; set; }
}