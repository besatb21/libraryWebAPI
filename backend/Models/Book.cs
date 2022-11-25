namespace LibraryApp.Models;
using System.ComponentModel.DataAnnotations;

public class Book
{
    public int Id { get; set; }
    public string? Name { get; set; }

    public string? Description { get; set; }

    public byte[]? Image { get; set; }
    [DataType(DataType.Date)]
    public DateTime Date { get; set; }

    public string? CreatedBy { get; set; }

    public int AuthorId { get; set; }
    // public Author? Author{get;set;}
    // many to manye 
    public ICollection<Category>? Categories { get; set; }
}

