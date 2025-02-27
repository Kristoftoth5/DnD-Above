using System.Text.Json.Serialization;

namespace Above_backend.Models
{
    public class Classes
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string Hit_Dice { get; set; }
        public int Starting_gold { get; set; }
        public int SpellCaster { get; set; }
        public List<string>? Armor_prof { get; set; }
        public List<string> Weapon_prof { get; set; }
        public List<string>? Tool_prof { get; set; }

        //public List<string> Saving_throws { get; set; }
    }
}