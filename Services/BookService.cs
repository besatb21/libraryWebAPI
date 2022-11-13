using LibraryApp.Models;

namespace LibraryApp.Services;

public static class BookService
{
    static List<Book> Books { get; }
    static int nextId = 3;
    static BookService()
    {
        Books = new List<Book>
        {
            new Book { Id = 1, Name = "Book1", Description = "sfsd", CreatedBy = "sdd" },
            new Book { Id = 2, Name = "Book1", Description = "sfsdf", CreatedBy = "sdd" },
        };
    }

    public static List<Book> GetAll() => Books;

    public static Book? Get(int id) => Books.FirstOrDefault(p => p.Id == id);

    public static void Add(Book book)
    {
        book.Id = nextId++;
        Books.Add(book);
    }

    public static void Delete(int id)
    {
        var pizza = Get(id);
        if(pizza is null)
            return;

        Books.Remove(pizza);
    }

    public static void Update(Book book)
    {
        var index = Books.FindIndex(p => p.Id == book.Id);
        if(index == -1)
            return;

        Books[index] =book;
    }
}   