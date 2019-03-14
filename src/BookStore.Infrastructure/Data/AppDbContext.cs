using BookStore.Core.Entities;
using BookStore.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Infrastructure.Data
{
    public class AppDbContext: DbContext, IAppDbContext
    {
        public AppDbContext(DbContextOptions options)
            :base(options) { }

        public DbSet<Book> Books { get; private set; }
        public DbSet<Tag> Tags { get; private set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultContainerName("BookStoreDocuments");

            modelBuilder.Entity<BookTag>()
                .HasKey(t => new { t.TagId, t.BookId });

            base.OnModelCreating(modelBuilder);
        }
    }
}
