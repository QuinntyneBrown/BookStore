using System;

namespace BookStore.Api.Entities
{
    public class Book
    {
        public Guid BookId { get; set; }
		public string Name { get; set; }
    }
}
