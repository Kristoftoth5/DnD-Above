using System.Text.Json.Serialization;

namespace Above_backend.Models
{
    public class SubClasses
    {
        [JsonIgnore]
        public int Id { get; set; }
        public string Name { get; set; }
        public int OriginClassId { get; set; }
        public string? Description { get; set; }
    }
}
