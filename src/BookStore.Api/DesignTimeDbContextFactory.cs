using BookStore.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace BookStore.Api
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .AddUserSecrets<Startup>()
                .Build();

            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlServer(configuration["Data:DefaultConnection:ConnectionString"])
                .Options;

            return new AppDbContext(options);
        }
    }
}