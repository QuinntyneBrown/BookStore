using BookStore.Api.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace BookStore.Api.Interfaces
{
    public interface IAppDbContext
    {
        DbSet<Book> Books { get; }
        Task<int> SaveChangesAsync(CancellationToken token);
    }
}
