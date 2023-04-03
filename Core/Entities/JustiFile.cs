using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class JustiFile : BaseEntity
    {
        public string FileName { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastModified { get; set; } = DateTime.Now;
        public string Grade { get; set; }
        public string Comment { get; set; }
        public bool Status { get; set; }
        public FileRepo FileRepo { get; set; }
    }
}