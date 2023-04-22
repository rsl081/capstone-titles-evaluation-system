using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Core.Entities.Identity;

namespace Core.Entities
{
    public class JustiFile : BaseEntity
    {
        public string Url { get; set; }
        public string PublicId { get; set; }

        public string FileName { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastModified { get; set; } = DateTime.Now;
        public string Grade { get; set; }
        public string Comment { get; set; }
        public bool Status { get; set; }
        [JsonIgnore]
        public AppUser AppUser { get; set; }
        public string AppUserId { get; set; }
        [JsonIgnore]
        public Group Group { get; set; }
        public Guid GroupId { get; set; }
        
    }
}