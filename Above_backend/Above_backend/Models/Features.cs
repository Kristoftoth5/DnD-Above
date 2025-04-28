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
        public List<string>? ArmorProf { get; set; }
        public List<string>? WeaponProf { get; set; }
        public List<string>? ToolProf { get; set; }
        public List<string>? SavingThrows { get; set; }
        public List<string>? SkillProf { get; set; }

        public int? OriginClassId { get; set; }
        [ForeignKey("OriginClassId")]
        [JsonIgnore]
        public Classes Classes { get; set; }

        public int? OriginSubClassId { get; set; }
        [ForeignKey("OriginSubClassId")]
        [JsonIgnore]
        public SubClasses SubClasses { get; set; }

        public int? OriginRaceId { get; set; }
        [ForeignKey("OriginRaceId")]
        [JsonIgnore]
        public Races Races { get; set; }

        public int? OriginEquipmentId { get; set; }
        [ForeignKey("OriginEquipmentId")]
        [JsonIgnore]
        public Equipment Equipment { get; set; }
    }
}
