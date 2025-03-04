using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Above_backend.Models
{
    public class Races
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string CreatureType { get; set; }
        public string Age { get; set; }
        public string Size { get; set; }
        public int Speed { get; set; }
        public List<string> Languages { get; set; }
    }
}
