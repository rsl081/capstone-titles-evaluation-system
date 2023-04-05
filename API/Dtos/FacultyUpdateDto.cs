using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class FacultyUpdateDto
    {
        // public string UserPhoto { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public bool IsApproved { get; set; }
        public string Expertise { get; set; }
        // public ICollection<string> UserRoles { get; set; }
    }
}