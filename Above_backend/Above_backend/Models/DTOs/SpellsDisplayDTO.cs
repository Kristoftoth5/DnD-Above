using System.ComponentModel.DataAnnotations.Schema;

namespace Above_backend.Models.DTOs
{
    public class SpellsDisplayDTO
    {
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
        public Classes? Classes { get; set; }
        public SubClasses? SubClasses { get; set; }
        public Races? Races { get; set; }
        public Equipment? Equipment { get; set; }
    }
}
