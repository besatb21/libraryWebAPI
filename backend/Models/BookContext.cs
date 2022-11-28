using Microsoft.EntityFrameworkCore;
using LibraryApp.Models;


namespace LibraryApp.Models
{
    public class BookContext : DbContext
    {
        public BookContext(DbContextOptions<BookContext> options)
            : base(options)
        {
        }

       
         protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BookCategory>().HasKey(sc => new { sc.BookId, sc.CategoryId });
    }

        public DbSet<Book> Books { get; set; } = null!;
        public DbSet<Author> Authors { get; set; } = null!;

        public DbSet<Category> Categories { get; set; } = null!;

        public DbSet<LibraryApp.Models.User> User { get; set; } = null!;

        public DbSet<LibraryApp.Models.BookCategory> BookCategory { get; set; }


    }
}