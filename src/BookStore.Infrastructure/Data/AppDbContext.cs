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
    }
}
