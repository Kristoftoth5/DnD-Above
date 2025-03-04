namespace Above_backend.Models.DTOs
{
    public class FeaturesCreateAndBaseDTO
    {
        public string Name { get; set; }
        public int? LevelReq { get; set; }
        public string? Description { get; set; }
        public int? OriginClassId { get; set; }
        public int? OriginSubClassId { get; set; }
        public int? OriginRaceId { get; set; }
        public int? OriginEquipmentId { get; set; }
        public List<string>? ArmorProf { get; set; }
        public List<string>? WeaponProf { get; set; }
        public List<string>? ToolProf { get; set; }
        public List<string> SavingThrows { get; set; }
    }
}
