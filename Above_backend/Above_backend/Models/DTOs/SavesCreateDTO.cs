using System.Reflection.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace Above_backend.Models.DTOs
{
    public class SavesCreateDTO
    {
        public string Name { get; set; }
        public string Sheet { get; set; }
        public int UserId { get; set; }
    }
}
