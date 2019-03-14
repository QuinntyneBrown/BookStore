using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Core.Entities
{
    public class BookTag
    {
        [ForeignKey("Book")]
        public Guid BookId { get; set; }
        [ForeignKey("Tag")]
        public Guid TagId { get; set; }
        public Book Book { get; set; }
        public Tag Tag { get; set; }
    }
}
