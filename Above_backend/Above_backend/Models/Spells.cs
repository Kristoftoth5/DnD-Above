using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Above_backend.Models
{
    public class Spells
    {
        [JsonIgnore]
        public int Id { get; set; }
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

        public int? OriginClassId { get; set; }
        [ForeignKey("OriginClassId")]
        public Classes Classes { get; set; }
        public int? OriginSubClassId { get; set; }
        [ForeignKey("OriginSubClassId")]
        public SubClasses SubClasses { get; set; }
        public int? OriginRaceId { get; set; }
        [ForeignKey("OriginRaceId")]
        public Races Races { get; set; }
        public int? OriginEquipmentId { get; set; }
        [ForeignKey("OriginEquipmentId")]
        public Equipment Equipment { get; set; }
    }
}
