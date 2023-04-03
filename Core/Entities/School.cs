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
        public List<AppUser> FacultyUser { get; set; } = new List<AppUser>();
    }
}