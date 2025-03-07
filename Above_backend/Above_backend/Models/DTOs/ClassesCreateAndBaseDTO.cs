namespace Above_backend.Models.DTOs
{
    public class ClassesCreateAndBaseDTO
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public string HitDice { get; set; }
        public int StartingGold { get; set; }
        public int SpellCaster { get; set; }
        public int HalfCaster { get; set; }
        public List<string>? ArmorProf { get; set; }
        public List<string>? WeaponProf { get; set; }
        public List<string>? ToolProf { get; set; }
        public List<string> SavingThrows { get; set; }
    }
}
