using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Content : BaseEntity
    {
        public string SchoolName { get; set; }
        public string Vision { get; set; }
        public string Mission { get; set; }
    }
}