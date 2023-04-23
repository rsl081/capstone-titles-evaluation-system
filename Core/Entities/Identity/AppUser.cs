using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public UserPhoto UserPhoto { get; set; }
        // Faculty
        public string Expertise { get; set; }
        public bool IsApproved { get; set; }
        public List<School> Schools { get; set; } = new List<School>();
        [JsonIgnore]
        public List<Section> Sections { get; set; } = new List<Section>();
        public List<Group> Groups { get; set; } = new List<Group>();
        // Student
        public List<Team> Teams { get; set; } = new List<Team>();
        public List<JustiFile> JustiFiles { get; set; } = new List<JustiFile>();
        public List<HearingFile> HearingFiles { get; set; } = new List<HearingFile>();
        public ICollection<AppUserRole> UserRoles { get; set; }
        public List<AppUserSection> AppUserSections { get; set; } = new List<AppUserSection>();
        public List<AppUserGroup> AppUserGroups { get; set; } = new List<AppUserGroup>();
    }
}