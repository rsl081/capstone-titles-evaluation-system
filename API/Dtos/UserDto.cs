using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Core.Entities;

namespace API.Dtos
{
    public class UserDto
    {
        public string Id { get; set; }
        public string UserPhoto { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string Expertise { get; set; }
        public string Token { get; set; }
        public List<Team> Teams { get; set; } = new List<Team>();
        public List<JustiFile> JustiFiles { get; set; } = new List<JustiFile>();
        
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