using BookStore.Core.Interfaces;
using BookStore.Infrastructure.Data;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Swagger;
using System.IO;

namespace BookStore.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options => options.AddPolicy("CorsPolicy",
                builder => builder
                .WithOrigins("http://localhost:4200")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(isOriginAllowed: _ => true)
                .AllowCredentials()));

            services.AddSwaggerGen(options =>
            {
                options.DescribeAllEnumsAsStrings();
                options.SwaggerDoc("v1", new Info
                {
                    Title = "Book Store",
                    Version = "v1",
                    Description = "Book Store REST API",
                });
                options.CustomSchemaIds(x => x.FullName);
            });

            services.AddScoped<IAppDbContext, AppDbContext>();
            
            services.AddEntityFrameworkCosmos();

            services.AddDbContext<AppDbContext>(options =>
            {

                services.AddLogging(builder =>
                   builder.AddConsole()
                          .AddFilter("", LogLevel.Debug));

                var loggerFactory = services.BuildServiceProvider()
                        .GetService<ILoggerFactory>();

                options.UseCosmos(
                    Configuration["CosmosDb:EndpointUrl"],
                    Configuration["CosmosDb:PrivateKey"],
                    Configuration["CosmosDb:DbName"])
                    .UseLoggerFactory(loggerFactory)
                    .EnableSensitiveDataLogging();
            });

            services.AddMediatR(typeof(Startup));

            services.AddHttpContextAccessor();
            
            services.AddMvc()
                .AddNewtonsoftJson()
                .SetCompatibilityVersion(CompatibilityVersion.Latest);
        }

        public void Configure(IApplicationBuilder app)
        {
            //var provider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "swagger"));

            app.UseStaticFiles(new StaticFileOptions
            {
                //FileProvider = provider,
                RequestPath = "/swagger",
                ServeUnknownFileTypes = true
            });

            //app.UseDirectoryBrowser(new DirectoryBrowserOptions
            //{
            //    FileProvider = provider,
            //    RequestPath = "/swagger"
            //});

            //app.UseStaticFiles();

            app.UseSwagger();

            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "Book Store API");
                options.RoutePrefix = string.Empty;
            });

            app.UseCors("CorsPolicy");
            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
