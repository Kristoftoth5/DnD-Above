using System.ComponentModel.DataAnnotations.Schema;

namespace Above_backend.Models.DTOs
{
    public class SubClassesDisplayDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? OriginClassId { get; set; }
        public string? Description { get; set; }
    }
}
