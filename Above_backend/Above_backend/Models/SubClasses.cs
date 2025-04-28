using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Above_backend.Models
{
    public class SubClasses
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? OriginClassId { get; set; }
        [ForeignKey("OriginClassId")]
        [JsonIgnore]
        public Classes Classes { get; set; }
        public string? Description { get; set; }
    }
}
