using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Above_backend.Models
{
    public class Features
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public int? LevelReq { get; set; }
        public string? Description { get; set; }

        public int? OriginClassId { get; set; }
        [ForeignKey("OriginClassId")]
<<<<<<< Updated upstream
        public Classes Classes { get; set; }
        public int? OriginSubClassId { get; set; }
        [ForeignKey("OriginSubClassId")]
        public SubClasses SubClasses { get; set; }
        public int? OriginRaceId { get; set; }
        [ForeignKey("OriginRaceId")]
        public Races Races { get; set; }
=======
        public Classes? OriginClass { get; set; }
        public int? OriginSubClassId { get; set; }
        [ForeignKey("OriginSubClassId")]
        public SubClasses? OriginSubClass { get; set; }
        public int? OriginRaceId { get; set; }
        [ForeignKey("OriginRaceId")]
        public Races? OriginRace { get; set; }
>>>>>>> Stashed changes
        public int? OriginEquipmentId { get; set; }
        [ForeignKey("OriginEquipmentId")]
        public Equipment Equipment { get; set; }
        public List<string>? Armor_prof { get; set; }
        public List<string>? Weapon_prof { get; set; }
        public List<string>? Tool_prof { get; set; }
        public List<string>? Saving_throws { get; set; }
    }
}
