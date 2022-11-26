
namespace LibraryApp.Models;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

public class Author
{
    public int Id { get; set; }

    public int User_id {get;set;}
    public string? Name { get; set; }
    public string? Bio { get; set; }

    [DataType(DataType.Date)]
    public DateTime createdAt { get; set; }

    public string? CreatedBy { get; set; }

    public ICollection<Book>? Books { get; set; }

}