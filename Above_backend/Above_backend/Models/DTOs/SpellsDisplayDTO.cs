using System.ComponentModel.DataAnnotations.Schema;

namespace Above_backend.Models.DTOs
{
    public class SpellsDisplayDTO : SpellsCreateAndBaseDTO
    {
        public int Id { get; set; }
    }
}
