using System.Reflection.Metadata;

namespace Above_backend.Models.DTOs
{
    public class SavesCreateDTO
    {
        public int Name { get; set; }
        public string Sheet { get; set; }
        public Blob? CharacterArt { get; set; }
        public int UserId { get; set; }
    }
}
