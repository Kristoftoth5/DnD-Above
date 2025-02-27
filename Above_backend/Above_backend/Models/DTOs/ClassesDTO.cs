namespace Above_backend.Models.DTOs
{
    public class ClassesDTO
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public string Hit_Dice { get; set; }
        public int Starting_gold { get; set; }
        public int SpellCaster { get; set; }
        public List<string>? Armor_prof { get; set; }
        public List<string> Weapon_prof { get; set; }
        public List<string>? Tool_prof { get; set; }
    }
}
