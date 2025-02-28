using System.ComponentModel.DataAnnotations.Schema;

namespace Above_backend.Models.DTOs
{
    public class SubClassesDisplayDTO
    {
        public string Name { get; set; }
        public Classes Classes { get; set; }
        public string? Description { get; set; }
    }
}
