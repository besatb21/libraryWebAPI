
using System.ComponentModel.DataAnnotations;

namespace LibraryApp.Models;


public class Category
{
    public string? Name { get; set; }
    // at the moment the priority is an integer
    public int? Priority { get; set; }


    [DataType(DataType.Date)]
    public DateTime createdAt { get; set; }

    public string? CreatedBy { get; set; }

    public int BookId { get; set; }
 public ICollection<Book> Books { get; set; }}
