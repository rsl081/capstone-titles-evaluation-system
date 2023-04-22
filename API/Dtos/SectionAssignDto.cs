using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class SectionAssignDto
    {
        public string AppUserId { get; set; }
        public Guid SectionId { get; set; }
    }
}