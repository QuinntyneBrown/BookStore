using BookStore.Infrastructure.Data;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace BookStore.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {            
            var host = CreateWebHostBuilder(args).Build();

            ProcessDbCommands(args, host);

            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();

        public static void ProcessDbCommands(string[] args, IWebHost host)
        {
            var services = (IServiceScopeFactory)host.Services.GetService(typeof(IServiceScopeFactory));

            using (var scope = services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                if (args.Contains("dropdb"))
                    context.Database.EnsureDeleted();

                if (args.Contains("createdb"))
                    context.Database.EnsureCreated();
                
                if (args.Contains("createdb") || args.Contains("dropdb"))
                    Environment.Exit(0);
            }
        }
    }
}
