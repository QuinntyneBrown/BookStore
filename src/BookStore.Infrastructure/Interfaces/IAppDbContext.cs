using BookStore.Core.Entities;
using BookStore.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookStore.Infrastructure.Interfaces
{
    public class AppDbContext: DbContext, IAppDbContext
    {
        public DbSet<Book> Books { get; private set; }
    }
}
