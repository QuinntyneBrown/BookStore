using System;

namespace BookStore.Api.Entities
{
    public class Book
    {
        public Guid BookId { get; set; }
		public string Name { get; set; }
        public string Author { get; set; }
    }
}
