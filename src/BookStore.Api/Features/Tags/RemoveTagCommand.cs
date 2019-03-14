using BookStore.Core.Interfaces;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace BookStore.Api.Features.Tags
{
    public class RemoveTagCommand
    {
        public class Request: IRequest
        {
            public Guid TagId { get; set; }
        }

        public class Handler : IRequestHandler<Request>
        {
            private readonly IAppDbContext _context;

            public Handler(IAppDbContext context) => _context = context;

            public async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
            {
                var tag = await _context.Tags.FindAsync(request.TagId);

                _context.Tags.Remove(tag);

                await _context.SaveChangesAsync(cancellationToken);

                return new Unit();
            }
        }
    }
}
