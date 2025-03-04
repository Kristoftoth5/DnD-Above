using System.ComponentModel.DataAnnotations.Schema;

namespace Above_backend.Models.DTOs
{
    public class SubClassesDisplayDTO : SubClassesCreateAndBaseDTO
    {
        public int Id { get; set; }
    }
}
