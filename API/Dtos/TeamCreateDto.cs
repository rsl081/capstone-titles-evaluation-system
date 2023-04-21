using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class TeamCreateDto
    {
        public string Name { get; set; }
        public Guid GroupId { get; set; }
    }
}