using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;

namespace Core.Entities
{
    public class School : BaseEntity
    {
        public string SchoolYear { get; set; }
        public List<Section> Sections { get; set; } = new List<Section>();
        // bale pag craete ng school year need na may faculty na agad doon

        // public AppUser AppUser { get; set; }
        // public Guid AppUserId { get; set; }
        // public List<AppUser> FacultyUser { get; set; } = new List<AppUser>();
    }
}