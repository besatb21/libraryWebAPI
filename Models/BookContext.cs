using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace LibraryApp.Models
{
    public class BookContext : DbContext
    {
        public BookContext(DbContextOptions<BookContext> options)
            : base(options)
        {
        }

        public DbSet<Book> Books { get; set; } = null!;
        public DbSet<Author> Authors {get; set;}  = null!;

        public DbSet<Category> Categories {get;set;} = null!;
    }
}