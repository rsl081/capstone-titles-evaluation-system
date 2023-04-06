using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class JustiUpdateDto
    {
        public string FileName { get; set; }
        public string Grade { get; set; }
        public string Comment { get; set; }
        public bool Status { get; set; }
    }
}