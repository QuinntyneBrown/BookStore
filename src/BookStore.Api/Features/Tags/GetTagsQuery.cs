using BookStore.Core.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace BookStore.Api.Features.Tags
{
    public class GetTagsQuery
    {
        public class Request : IRequest<Response> { }

        public class Response
        {
            public IEnumerable<TagDto> Tags { get; set; }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IAppDbContext _context;

            public Handler(IAppDbContext context) => _context = context;

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
                =>  new Response()
                {
                    Tags = await _context.Tags
                    .Include(x => x.BookTags)
                    .ThenInclude(x => x.Book)
                    .Select(x => x.ToDto()).ToArrayAsync()
                };
        }
    }
}
