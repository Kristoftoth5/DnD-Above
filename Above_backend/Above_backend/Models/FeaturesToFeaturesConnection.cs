using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Above_backend.Models
{
    public class FeaturesToFeaturesConnection
    {
        public int Id { get; set; }
        public int OriginFeatureId { get; set; }
        [JsonIgnore]
        [ForeignKey("OriginFeatureId")]
        public Features OriginFeature { get; set; }

        public int SubFeatureId { get; set; }
        [JsonIgnore]
        [ForeignKey("SubFeatureId")]
        public Features SubFeature { get; set; }
    }
}
