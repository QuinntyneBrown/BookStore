using System;
using System.Collections.Generic;

namespace BookStore.Core.Entities
{
    public class Tag
    {
        public Guid TagId { get; set; }
		public string Name { get; set; }
        public ICollection<BookTag> BookTags { get; set; }
        = new HashSet<BookTag>();
    }
}
