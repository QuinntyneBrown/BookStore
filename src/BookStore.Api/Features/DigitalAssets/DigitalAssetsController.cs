﻿using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BookStore.Api.Features.DigitalAssets
{
    [Route("api/digitialAssets")]
    [ApiController]
    public class DigitialAssetsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public DigitialAssetsController(IMediator mediator)
            => _mediator = mediator;

        [HttpPost(""), DisableRequestSizeLimit]
        public async Task<ActionResult<UploadDigitalAssetCommand.Response>> Upload()
            => await _mediator.Send(new UploadDigitalAssetCommand.Request());

        [HttpGet("serve/{filename}")]
        public async Task<ActionResult<GetDigitalAssetByFileNameQuery.Response>> Serve(GetDigitalAssetByFileNameQuery.Request request)
            => await _mediator.Send(request);
    }
}
