namespace LibraryApp.Models;
using System.ComponentModel.DataAnnotations;


public class User
{

    public int Id { get; set; }

    public string? Role { get; set; }

    public string Username { get; set; } = "";

    public string? Password { get; set; }

    [DataType(DataType.Date)]
    public DateTime createdAt { get; set; }
}