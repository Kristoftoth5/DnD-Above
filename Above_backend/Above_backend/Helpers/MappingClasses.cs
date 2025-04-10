using Above_backend.Models;
using Above_backend.Models.DTOs;
using Microsoft.OpenApi.Validations;

namespace Above_backend.Helpers
{
    public class MappingClasses
    {
        public static ClassesDisplayDTO ClassesToClassesDisplayDTO(Classes classes)
        {
            return new ClassesDisplayDTO
            {
                Id = classes.Id,
                Name = classes.Name,
                Description = classes.Description,
                HitDice = classes.HitDice,
                StartingGold = classes.StartingGold,
                SpellCaster = classes.SpellCaster,
                ArmorProf = classes.ArmorProf,
                WeaponProf = classes.WeaponProf,
                ToolProf = classes.ToolProf,
                SavingThrows = classes.SavingThrows,
                HalfCaster = classes.HalfCaster,
            };
        }
    }
}
