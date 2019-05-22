using System;

namespace BookStore.Core.Entities
{
    public class Book
    {
        public Guid BookId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public string ImageUrl { get; set; }
        public string Author { get; set; }
    }
}
