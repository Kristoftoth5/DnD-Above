using System.ComponentModel.DataAnnotations.Schema;
using System.Drawing;
using System.Reflection.Metadata;
using System.Reflection.Metadata.Ecma335;

namespace Above_backend.Models
{
    public class Saves
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Sheet {  get; set; }
        public string? CharacterArtPath { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public Users Users { get; set; }
    }
}
