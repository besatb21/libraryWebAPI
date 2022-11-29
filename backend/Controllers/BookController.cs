using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Microsoft.EntityFrameworkCore;
using LibraryApp.Models;
using Microsoft.AspNetCore.OData;
using Microsoft.AspNetCore.OData.Query;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace LibraryApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private const string relativePath = "wwwroot/images/";
        private const string MimeType = "image/jpg";
        private readonly BookContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public BookController(BookContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        // GET: api/Book
        [HttpGet("Author/{author_id}")]
        public IQueryable<Book> GetBooks(int author_id)
        {

            return _context.Books.Where(b => b.AuthorId == author_id);
        }



        [HttpGet("Admin/")]
        [Authorize(Roles = "Administrator")]
        public IQueryable BookListAuthorEndpoint()
        {
            var innerJoin = from b in _context.Books
                            join a in _context.Authors
                            on b.AuthorId equals a.Id
                            select new { book = b, author = a.Name };


            return innerJoin;
        }



        // GET: api/Book/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return null;
            }

            return book;
        }

        // PUT: api/Book/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, [FromForm] Book book)
        {
            if (id != book.Id)
            {
                return BadRequest();
            }

            string uniqueFileName = UploadedFile(book);
            // if (uniqueFileName != "")
            book.ImageUrl = uniqueFileName;
            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private string UploadedFile(Book book)
        {
            string uniqueFileName = "";
            if (book.Image != null)
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "images");
                uniqueFileName = Guid.NewGuid().ToString() + "" + book.Image.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    book.Image.CopyTo(fileStream);
                }
            }
            return uniqueFileName;
        }

        [HttpGet("image-file/{id}")]
        public async Task<IActionResult> ReturnByteArray(int id)
        {
            var book = await _context.Books.FindAsync(id);
            var FileName = book.ImageUrl;
            byte[] imageArray = System.IO.File.ReadAllBytes(relativePath + FileName);

            return File(imageArray, MimeType);
        }


        // POST: api/Book
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook([FromForm] Book book)
        {
            string uniqueFileName = UploadedFile(book);
            book.ImageUrl = uniqueFileName;
            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBook", new { id = book.Id }, book);
        }

        // DELETE: api/Book/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.Id == id);
        }
    }
}
