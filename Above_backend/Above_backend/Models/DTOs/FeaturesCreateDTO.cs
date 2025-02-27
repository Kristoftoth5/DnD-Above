using System.ComponentModel.DataAnnotations.Schema;

namespace Above_backend.Models.DTOs
{
    public class FeaturesCreateDTO
    {
        public string Name { get; set; }
        public int? LevelReq { get; set; }
        public string? Description { get; set; }
        public int? OriginClassId { get; set; }
        public int? OriginSubClassId { get; set; }
        public int? OriginRaceId { get; set; }
        public int? OriginEquipmentId { get; set; }
        public List<string>? Armor_prof { get; set; }
        public List<string>? Weapon_prof { get; set; }
        public List<string>? Tool_prof { get; set; }
        public List<string>? Saving_throws { get; set; }
    }
}