using Above_backend.Models.DTOs;
using Above_backend.Models;

namespace Above_backend.Helpers
{
    public class MappingSubClasses
    {
        public static SubClassesDisplayDTO SubClassesToSubClassesDisplayDTO(SubClasses subclasses)
        {
            return new SubClassesDisplayDTO
            {
                Id = subclasses.Id,
                Name = subclasses.Name,
                OriginClassId = subclasses.OriginClassId,
                Description = subclasses.Description,
            };
        }
 
    }
}