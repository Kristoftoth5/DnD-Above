using System.ComponentModel.DataAnnotations.Schema;

namespace Above_backend.Models.DTOs
{
    public class SpellsCreateAndBaseDTO
    {
        public string School { get; set; }
        public int Concentration { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }
        public string? Description { get; set; }
        public string Range { get; set; }
        public string Duration { get; set; }
        public int Ritual { get; set; }
        public string CastingTime { get; set; }
        public string Component { get; set; }
        public int? ComponentPrice { get; set; }
        public List<int> LearnedBy { get; set; }
        public int? OriginEquipmentId { get; set; }
    }
}
