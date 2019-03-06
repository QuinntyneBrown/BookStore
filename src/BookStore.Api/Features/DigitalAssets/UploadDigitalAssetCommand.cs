using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Net.Http.Headers;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;


namespace BookStore.Api.Features.DigitalAssets
{
    public class UploadDigitalAssetCommand
    {
        public class Request : IRequest<Response> { }

        public class Response
        {
            public List<string> Urls { get;set; }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly CloudBlobClient _cloudBlobClient;
            private readonly CloudStorageAccount _cloudStorageAccount;
            private readonly IHttpContextAccessor _httpContextAccessor;
                        
            public Handler(
                CloudBlobClient cloudBlobClient,
                CloudStorageAccount cloudStorageAccount,
                IHttpContextAccessor httpContextAccessor) {
                _cloudBlobClient = cloudBlobClient;
                _cloudStorageAccount = cloudStorageAccount;
                _httpContextAccessor = httpContextAccessor;

                _cloudBlobClient = _cloudStorageAccount.CreateCloudBlobClient();
            }

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken) {

                var container = _cloudBlobClient.GetContainerReference("images");

                await container.CreateIfNotExistsAsync();

                var httpContext = _httpContextAccessor.HttpContext;

                var defaultFormOptions = new FormOptions();

                var mediaTypeHeaderValue = MediaTypeHeaderValue.Parse(httpContext.Request.ContentType);

                var boundary = MultipartRequestHelper.GetBoundary(
                    mediaTypeHeaderValue,
                    defaultFormOptions.MultipartBoundaryLengthLimit);

                var reader = new MultipartReader(boundary, httpContext.Request.Body);

                var section = await reader.ReadNextSectionAsync();

                var urls = new List<string>();

                while (section != null)
                {
                    urls.Add(await Upload(container, section));
                   
                    section = await reader.ReadNextSectionAsync();
                }
                
                return new Response()
                {
                    Urls = urls
                };
            }

            public async Task<string> Upload(CloudBlobContainer container, MultipartSection section)
            {                
                if (ContentDispositionHeaderValue.TryParse(section.ContentDisposition, out var disposition))
                {
                    if (MultipartRequestHelper.HasFileContentDisposition(disposition))
                    {
                        using (var targetStream = new MemoryStream())
                        {
                            var fileName = $"{disposition.FileName}"
                                .Trim(new char[] { '"' })
                                .Replace("&", "and");

                            await section.Body.CopyToAsync(targetStream);

                            var blockBlob = container.GetBlockBlobReference(fileName);

                            blockBlob.Properties.ContentType = $"{section.ContentType}";

                            await blockBlob.UploadFromStreamAsync(targetStream);

                            return $"{blockBlob.StorageUri.PrimaryUri}";
                        }
                    }
                }

                return null;
            }
        }
    }
}
