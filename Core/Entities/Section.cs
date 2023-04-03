using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Section : BaseEntity
    {
        public string Name { get; set; }
        public string Group { get; set; }
        public School School { get; set; }
        public string SchoolId { get; set; }
    }
}