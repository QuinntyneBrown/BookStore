using BookStore.Api.Features.Tags;
using BookStore.Core.Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace BookStore.Api.Features.Books
{
    public class BookDto
    {        
        public Guid BookId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public string ImageUrl { get; set; }
        public string Author { get; set; }
        public ICollection<TagDto> Tags { get; set; }
        = new HashSet<TagDto>();

    }

    public static class BookExtensions
    {        
        public static BookDto ToDto(this Book book)
        {
            return new BookDto
            {
                BookId = book.BookId,
                Name = book.Name,
                Price = book.Price,
                Description = book.Description,
                ImageUrl = book.ImageUrl,
                Author = book.Author,
                Tags = book.BookTags
                .Select(x => x.Tag.ToDto())
                .ToList()
            };
        }
    }
}
