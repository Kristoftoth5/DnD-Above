namespace Above_backend.Models.DTOs
{
    public class EquipmentsCreateAndBaseDTO
    {
        public string Name { get; set; }
        public string Rarity { get; set; }
        public int? ProfReq { get; set; }
        public string? DamageDie { get; set; }
        public string? EquipmentType { get; set; }
        public string? DamageType { get; set; }
        public List<string>? Properties { get; set; }
        public int? AC { get; set; }
        public int Consumable { get; set; }
        public int Price { get; set; }
        public string? Description { get; set; }
        public int Attunement { get; set; }
    }
}
