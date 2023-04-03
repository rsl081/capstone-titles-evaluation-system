using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class School : BaseEntity
    {
        public string SchoolYear { get; set; }
        public string Section { get; set; }
        public string Group { get; set; }
    }
}