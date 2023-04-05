using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Core.Entities.Identity;

namespace Core.Entities
{
    public class Section : BaseEntity
    {
        public string Name { get; set; }
        public string Group { get; set; }
        [JsonIgnore]
        public School School { get; set; }
        public Guid SchoolId { get; set; }
        [JsonIgnore]
        public AppUser AppUser { get; set; }
        public string AppUserId { get; set; }
        // public Guid SchoolId { get; set; }
    }
}