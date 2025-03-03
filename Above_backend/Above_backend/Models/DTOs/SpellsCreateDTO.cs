using System.ComponentModel.DataAnnotations.Schema;

namespace Above_backend.Models.DTOs
{
    public class SpellsCreateDTO
    {
        public string School { get; set; }
        public int Concentration { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }
        public string? Description { get; set; }
        public int Range { get; set; }
        public string Duration { get; set; }
        public int Ritual { get; set; }
        public string CastingTime { get; set; }
        public string Component { get; set; }
        public int? ComponentPrice { get; set; }
<<<<<<< Updated upstream
        public int? OriginClassId { get; set; }
        public int? OriginSubClassId { get; set; }
        public int? OriginRaceId { get; set; }
        public int? OriginEquipmentId { get; set; }
=======
        public int? OriginClassId { get; set; } = 0;
        public int? OriginSubClassId { get; set; } = 0;
        public int? OriginRaceId { get; set; } = 0;
        public int? OriginEquipmentId { get; set; } = 0;
>>>>>>> Stashed changes
    }
}
