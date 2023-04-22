using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Core.Entities.Identity;

namespace Core.Entities
{
    public class AppUserSection : BaseEntity
    {
        [JsonIgnore]
        public AppUser AppUser { get; set; }
        public string AppUserId { get; set; }
        [JsonIgnore]
        public Section Section { get; set; }
        public Guid SectionId { get; set; }
    }
}