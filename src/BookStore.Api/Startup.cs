using BookStore.Core.Interfaces;
using BookStore.Infrastructure.Data;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;

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

            services.AddScoped<IAppDbContext, AppDbContext>();
            
            
            services.AddSwaggerGen(options =>
            {
                options.DescribeAllEnumsAsStrings();
                options.SwaggerDoc("v1", new Info
                {
                    Title = "Book Store",
                    Version = "v1",
                    Description = "Book Store Api",
                });
                options.CustomSchemaIds(x => x.FullName);
            });

            services.AddEntityFrameworkCosmos();

            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseCosmos(
                    Configuration["CosmosDb:EndpointUrl"],
                    Configuration["CosmosDb:PrivateKey"],
                    Configuration["CosmosDb:DbName"]);
            });

            services.AddMediatR(typeof(Startup));

            services.AddHttpContextAccessor();
            
            services.AddMvc()
                .AddNewtonsoftJson()
                .SetCompatibilityVersion(CompatibilityVersion.Latest);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseSwagger();

            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "Book Store Api");
                options.RoutePrefix = string.Empty;
            });

            app.UseCors("CorsPolicy");
            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
