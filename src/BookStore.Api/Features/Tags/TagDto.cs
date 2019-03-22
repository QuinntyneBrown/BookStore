using BookStore.Api.Features.Books;
using BookStore.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BookStore.Api.Features.Tags
{
    public class TagDto
    {        
        public Guid TagId { get; set; }
        public string Name { get; set; }
        public ICollection<BookDto> Books { get; set; }
        = new HashSet<BookDto>();
    }

    public static class TagExtensions
    {        
        public static TagDto ToDto(this Tag tag)
            => new TagDto
            {
                TagId = tag.TagId,
                Name = tag.Name,
                Books = tag.BookTags
                .Select(x => x.Book.ToDto())
                .ToList()
            };
    }
}
