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
        public string PhotoUrl { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public List<string> Teams { get; set; } = new List<string>();
        public string Token { get; set; }
        
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