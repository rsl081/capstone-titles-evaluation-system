using System;
using System.Collections.Generic;
using System.Linq;
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
        public List<School> Schools { get; set; } = new List<School>();
        // Student
        public string Group { get; set; }
        public string Section { get; set; }
        public string Team { get; set; }
        public List<JustiFile> JustiFiles { get; set; } = new List<JustiFile>();
        public ICollection<AppUserRole> UserRoles { get; set; }
        // public List<Area> Areas { get; set; } = new List<Area>();
    }
}