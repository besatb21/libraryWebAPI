using LibraryApp.Models;
using LibraryApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApp.Controllers;

[ApiController]
[Route("[controller]")]
public class BookController : ControllerBase
{
    public BookController()
    {
    }

    // GET all action
    [HttpGet]
    public ActionResult<List<Book>> GetAll() =>
    BookService.GetAll();

    // GET by Id action

    // POST action
    [HttpPost]
    public IActionResult Create(Book book)
    {
        BookService.Add(book);
        return CreatedAtAction(nameof(Create), new { id = book.Id }, book);
    }
    // PUT action
    [HttpPut("{id}")]
public IActionResult Update(int id, Book book)
{
    if (id != book.Id)
        return BadRequest();
           
    var existingPizza = BookService.Get(id);
    if(existingPizza is null)
        return NotFound();
   
    BookService.Update(book);           
   
    return NoContent();
}

    // DELETE action
}