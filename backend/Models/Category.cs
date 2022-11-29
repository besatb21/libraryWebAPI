using System.ComponentModel.DataAnnotations;
namespace LibraryApp.Models;


public class Category
{
    public int Id { get; set; }

    public string? Name { get; set; }
    // at the moment the priority is an integer
    public int? Priority { get; set; }


    [DataType(DataType.Date)]
    public DateTime createdAt { get; set; }

    public string? CreatedBy { get; set; }

    public ICollection<BookCategory>? BookCategories { get; set; }
}
