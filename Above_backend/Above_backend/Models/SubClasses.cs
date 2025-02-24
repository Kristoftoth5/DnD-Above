namespace Above_backend.Models
{
    public class SubClasses
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int OriginClassId { get; set; }
        public string? Description { get; set; }
    }
}
