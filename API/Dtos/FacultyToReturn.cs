using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class FacultyToReturn
    {
        public string Id { get; set; }
        public string UserPhoto { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public bool IsApproved { get; set; }
        public string Expertise { get; set; }
        public ICollection<string> UserRoles { get; set; }
        public ICollection<Object> AppUserSections { get; set; }
        public ICollection<Object> AppUserGroups { get; set; }
        [JsonIgnore]
        public DateTime Created { get; set; }
        public string CreatedAt { 
            get{
                return Created.ToString("MM/dd/yyyy hh:mm:tt");
            }
            set{}
        }
    }
}