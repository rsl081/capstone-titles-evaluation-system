using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class GroupAssignDto
    {
        public string AppUserId { get; set; }
        public Guid GroupId { get; set; }
    }
}