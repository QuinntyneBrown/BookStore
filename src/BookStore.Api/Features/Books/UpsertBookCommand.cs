using BookStore.Core.Interfaces;
using BookStore.Core.Entities;
using FluentValidation;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace BookStore.Api.Features.Books
{
    public class UpsertBookCommand
    {

        public class Validator: AbstractValidator<Request> {
            public Validator()
            {
                RuleFor(request => request.Book.BookId).NotNull();
            }
        }

        public class Request : IRequest<Response> {
            public BookDto Book { get; set; }
        }

        public class Response
        {
            public Guid BookId { get;set; }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            public IAppDbContext _context { get; set; }
            public Handler(IAppDbContext context) => _context = context;

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken) {
                var book = await _context.Books.FindAsync(request.Book.BookId);

                if (book == null) {
                    book = new Book();
                    _context.Books.Add(book);
                }

                book.Name = request.Book.Name;

                await _context.SaveChangesAsync(cancellationToken);

                return new Response() { BookId = book.BookId };
            }
        }
    }
}
