using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BookStore.Api.Features.DigitalAssets
{
    [Route("api/digitalAssets")]
    [ApiController]
    public class DigitialAssetsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public DigitialAssetsController(IMediator mediator)
            => _mediator = mediator;

        [HttpPost(""), DisableRequestSizeLimit]
        public async Task<ActionResult<UploadDigitalAssetCommand.Response>> Upload()
            => await _mediator.Send(new UploadDigitalAssetCommand.Request());
    }
}
