using AutoMapper;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        protected readonly DataContext _dataContext;
        protected readonly IMapper _mapper;

        public BaseApiController(DataContext dataContext, IMapper mapper)
        {
            this._mapper = mapper;
            this._dataContext = dataContext;
        }
        public BaseApiController(IMapper mapper)
        {
            this._mapper = mapper;
        }
    }
}