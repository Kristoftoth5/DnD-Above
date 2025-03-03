using System.ComponentModel.DataAnnotations.Schema;

namespace Above_backend.Models.DTOs
{
    public class FeaturesDisplayDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? LevelReq { get; set; }
        public string? Description { get; set; }
<<<<<<< Updated upstream
        public Classes? Classes { get; set; }
        public SubClasses? SubClasses { get; set; }
        public Races? Races { get; set; }
        public Equipment? Equipment { get; set; }
=======
        public int? OriginClassId { get; set; }
        public int? OriginSubClassId { get; set; }
        public int? OriginRaceId { get; set; }
        public int? OriginEquipmentId { get; set; }
>>>>>>> Stashed changes
        public List<string>? Armor_prof { get; set; }
        public List<string>? Weapon_prof { get; set; }
        public List<string>? Tool_prof { get; set; }
        public List<string>? Saving_throws { get; set; }
    }
}