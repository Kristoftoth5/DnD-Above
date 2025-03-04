using System.ComponentModel.DataAnnotations.Schema;

namespace Above_backend.Models.DTOs
{
    public class FeaturesDisplayDTO : FeaturesCreateAndBaseDTO
    {
        public int Id { get; set; }
    }
}