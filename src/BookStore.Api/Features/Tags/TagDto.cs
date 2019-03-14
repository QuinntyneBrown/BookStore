using BookStore.Core.Entities;
using System;

namespace BookStore.Api.Features.Tags
{
    public class TagDto
    {        
        public Guid TagId { get; set; }
        public string Name { get; set; }
    }

    public static class TagExtensions
    {        
        public static TagDto ToDto(this Tag tag)
            => new TagDto
            {
                TagId = tag.TagId,
                Name = tag.Name
            };
    }
}
