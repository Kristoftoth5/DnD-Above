using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;
using System.Reflection.Metadata.Ecma335;

namespace Above_backend.Models
{
    public class Saves
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Sheet {  get; set; }
        public Blob? CharacterArt { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public Users Users { get; set; }
    }
}
