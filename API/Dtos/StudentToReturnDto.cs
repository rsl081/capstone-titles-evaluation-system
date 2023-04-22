using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class StudentToReturnDto
    {
        public string Id { get; set; }
        public string UserPhoto { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public List<Object> Teams { get; set; } = new List<Object>();
        public List<Object> JustiFile { get; set; } = new List<Object>();
        public string Token { get; set; }
        public ICollection<Object> AppUserSections { get; set; }
        
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