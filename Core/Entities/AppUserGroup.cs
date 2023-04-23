using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Core.Entities.Identity;

namespace Core.Entities
{
    public class AppUserGroup : BaseEntity
    {
        [JsonIgnore]
        public AppUser AppUser { get; set; }
        public string AppUserId { get; set; }
        [JsonIgnore]
        public Group Group { get; set; }
        public Guid GroupId { get; set; }
    }
}