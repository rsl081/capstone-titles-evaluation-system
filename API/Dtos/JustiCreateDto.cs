using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class JustiCreateDto
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public string AppUserId { get; set; }
    }
}