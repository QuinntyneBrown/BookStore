using BookStore.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace BookStore.Core.Interfaces
{
    public interface IAppDbContext
    {
        DbSet<Book> Books { get; }
        DbSet<Tag> Tags { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken));
    }
}
