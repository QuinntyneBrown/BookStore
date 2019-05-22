using BookStore.Core.Interfaces;
using BookStore.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BookStore.Api
{
    public static class Dependencies
    {
        public static void AddDependencies(this IServiceCollection services, IConfiguration config)
        {
            {
                services.AddCors(options => options.AddPolicy("CorsPolicy",
                    builder => builder
                    .WithOrigins("http://localhost:4200")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .SetIsOriginAllowed(isOriginAllowed: _ => true)
                    .AllowCredentials()));

                services.AddScoped<IAppDbContext, AppDbContext>();

                services.AddDbContext<AppDbContext>(options =>
                {
                    options
                    .UseSqlServer(config["Data:DefaultConnection:ConnectionString"], b => b.MigrationsAssembly("BookStore.Infrastructure"));
                });

                services.AddMediatR(typeof(Startup));

                services.AddHttpContextAccessor();

            }
        }
}
