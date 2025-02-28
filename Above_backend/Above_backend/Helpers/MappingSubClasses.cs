using Above_backend.Models.DTOs;
using Above_backend.Models;

namespace Above_backend.Helpers
{
    public class MappingSubClasses
    {
        public static SubClasses SubClassesToSubClassesDisplayDTO(SubClassesCreateDTO subclassescreatedto)
        {
            return new SubClasses
            {
                Name = subclassescreatedto.Name,
                OriginClassId = subclassescreatedto.OriginClassId,
                //Classes = ??,
                Description = subclassescreatedto.Description,
            };
        }
        public static SubClassesDisplayDTO SubClassesToSubClassesDisplayDTO(SubClasses subclasses)
        {
            return new SubClassesDisplayDTO
            {
                Name = subclasses.Name,
                Classes = subclasses.Classes,
                Description = subclasses.Description,
            };
        }
 
    }
}