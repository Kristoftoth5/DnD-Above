using Above_backend.Models.DTOs;
using Above_backend.Models;

namespace Above_backend.Helpers
{
    public class MappingSubClasses
    {
<<<<<<< Updated upstream
        public static SubClasses SubClassesToSubClassesDisplayDTO(SubClassesCreateDTO subclassescreatedto)
=======
        public static SubClasses SubClassesCreateDtoToSubclasses(SubClassesCreateDTO subclassescreatedto, Classes originalclass)
>>>>>>> Stashed changes
        {
            return new SubClasses
            {
                Name = subclassescreatedto.Name,
<<<<<<< Updated upstream
                OriginClassId = subclassescreatedto.OriginClassId,
                //Classes = ??,
=======
                OriginClass = originalclass,
>>>>>>> Stashed changes
                Description = subclassescreatedto.Description,
            };
        }
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