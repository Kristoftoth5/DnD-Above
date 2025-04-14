using Above_backend.Models.DTOs;
using Above_backend.Models;

namespace Above_backend.Helpers
{
    public class MappingSaves
    {
        public static SavesBaseDisplayDTO SavesToSavesBaseDisplayDTO(Saves saves)
        {
            return new SavesBaseDisplayDTO
            {
                Id = saves.Id,
                Name = saves.Name,
            };
        }
        public static Saves SavesCreateDTOToSaves(SavesCreateDTO savescreatedto)
        {
            return new Saves
            {
                Name = savescreatedto.Name,
                Sheet = savescreatedto.Sheet,
                UserId = savescreatedto.UserId,
            };
        }
        public static SavesSheetDisplayDTO SavesToSavesSheetDisplayDTO(Saves saves)
        {
            return new SavesSheetDisplayDTO
            {
                Id = saves.Id,
                Sheet = saves.Sheet,
            };
        }
    }
}
