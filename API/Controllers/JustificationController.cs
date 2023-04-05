using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Infrastructure.Data;

namespace API.Controllers
{
    public class JustificationController : BaseApiController
    {
        public JustificationController(DataContext dataContext, IMapper mapper) : base(dataContext, mapper)
        {
        }

        
    }
}