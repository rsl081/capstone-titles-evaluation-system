using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class SectionCreateDto
    {
        public string Name { get; set; }
        public Guid SchoolId { get; set; }
        // public string AppUserId { get; set; }
    
    }
}