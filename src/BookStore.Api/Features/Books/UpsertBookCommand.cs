using BookStore.Core.Entities;
using BookStore.Core.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace BookStore.Api.Features.Books
{
    public class UpsertBookCommand
    {
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
                book.Description = request.Book.Description;
                book.ImageUrl = request.Book.ImageUrl;
                book.Author = request.Book.Author;
                book.Price = request.Book.Price;

                book.BookTags.Clear();

                foreach (var tagName in request.Book.Tags)
                {
                    var tagId = (await _context.Tags.SingleAsync(x => x.Name == tagName)).TagId;

                    book.BookTags.Add(new BookTag { TagId = tagId });
                }

                await _context.SaveChangesAsync(cancellationToken);

                return new Response() { BookId = book.BookId };
            }
        }
    }
}
