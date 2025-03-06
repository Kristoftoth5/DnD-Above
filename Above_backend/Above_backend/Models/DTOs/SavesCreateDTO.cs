using System.Reflection.Metadata;

namespace Above_backend.Models.DTOs
{
    public class SavesCreateDTO
    {
        public string Name { get; set; }
        public string Sheet { get; set; }
        public string? CharacterArtPath { get; set; }
        public int UserId { get; set; }
    }
}
