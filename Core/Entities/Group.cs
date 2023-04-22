using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Core.Entities.Identity;

namespace Core.Entities
{
    public class Group : BaseEntity
    {
        public string GroupName { get; set; }
        [JsonIgnore]
        public Section Section { get; set; }
        public Guid SectionId { get; set; }
        [JsonIgnore]
        public AppUser AppUser { get; set; }
        public string AppUserId { get; set; }
        public List<Team> Teams { get; set; } = new List<Team>();
        public List<JustiFile> JustiFiles { get; set; } = new List<JustiFile>();
    }
}