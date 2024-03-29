using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryApp.Models;

namespace LibraryApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookCategoryController : ControllerBase
    {
        private readonly BookContext _context;

        public BookCategoryController(BookContext context)
        {
            _context = context;
        }

        // GET: api/BookCategory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookCategory>>> GetBookCategory()
        {
            return await _context.BookCategory.ToListAsync();
        }

        [HttpGet("Grouped")]
        public IQueryable GetBookCategoryGrouped()
        {

            var innerJoin = from b in _context.BookCategory
                            join a in _context.Categories
                            on b.CategoryId equals a.Id
                            select new { book = b.BookId, Category = a.Name };

            return innerJoin.GroupBy(
                     p => p.book,
                      (key, g) => new { id = key, categories = g.ToList() });
        }

        [HttpGet("book/{book_id}")]
        public IQueryable<BookCategory> GetBookCategory(int book_id)
        {
            var bookCategory = from e in _context.BookCategory where e.BookId == book_id select e;

            return bookCategory;
        }

        // PUT: api/BookCategory/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookCategory(int id, BookCategory bookCategory)
        {
            if (id != bookCategory.BookId)
            {
                return BadRequest();
            }

            _context.Entry(bookCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookCategoryExists(id))
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

        // POST: api/BookCategory
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BookCategory>> PostBookCategory(BookCategory bookCategory)
        {
            _context.BookCategory.Add(bookCategory);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BookCategoryExists(bookCategory.BookId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBookCategory", new { id = bookCategory.BookId }, bookCategory);
        }

        // DELETE: api/BookCategory/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookCategory(int id)
        {
            var bookCategory = await _context.BookCategory.FindAsync(id);
            if (bookCategory == null)
            {
                return NotFound();
            }

            _context.BookCategory.Remove(bookCategory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookCategoryExists(int id)
        {
            return _context.BookCategory.Any(e => e.BookId == id);
        }
    }
}
