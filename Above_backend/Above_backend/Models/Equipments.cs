using System.Text.Json.Serialization;

namespace Above_backend.Models
{
    public class Equipment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Rarity { get; set; }
        public int? ProfReq { get; set; }
        public string? EquipmentType { get; set; }
        public string? DamageDie { get; set; }
        public string? DamageType { get; set; }
        public int? AC { get; set; }
        public List<string>? Properties { get; set; }
        public int Consumable { get; set; }
        public int Price { get; set; }
        public string? Description { get; set; }
        public int Attunement { get; set; }
    }
}
