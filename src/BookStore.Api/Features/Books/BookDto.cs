using BookStore.Api.Entities;
using System;

namespace BookStore.Api.Features.Books
{
    public class BookDto
    {        
        public Guid BookId { get; set; }
        public string Name { get; set; }
    }

    public static class BookExtensions
    {        
        public static BookDto ToDto(this Book book)
            => new BookDto
            {
                BookId = book.BookId,
                Name = book.Name
            };
    }
}
