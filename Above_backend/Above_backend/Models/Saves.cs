using System.ComponentModel.DataAnnotations.Schema;
using System.Drawing;
using System.Reflection.Metadata;
using System.Reflection.Metadata.Ecma335;
using System.Text.Json.Serialization;

namespace Above_backend.Models
{
    public class Saves
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Sheet {  get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        [JsonIgnore]
        public User User { get; set; }
    }
}
