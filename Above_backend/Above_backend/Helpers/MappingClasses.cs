using Above_backend.Models;
using Above_backend.Models.DTOs;
using Microsoft.OpenApi.Validations;

namespace Above_backend.Helpers
{
    public class MappingClasses
    {
        public static ClassesDTO ClassesToClassesDTO(Classes classes)
        {
            return new ClassesDTO
            {
                Name = classes.Name,
                Description = classes.Description,
                Hit_Dice = classes.Hit_Dice,
                Starting_gold = classes.Starting_gold,
                SpellCaster = classes.SpellCaster,
                Armor_prof = classes.Armor_prof,
                Weapon_prof = classes.Weapon_prof,
                Tool_prof = classes.Tool_prof,
            };
        }

        public static Classes ClassesDtoToClasses(ClassesDTO classesDto)
        {
            return new Classes
            {
                Name = classesDto.Name,
                Description = classesDto.Description,
                Hit_Dice = classesDto.Hit_Dice,
                Starting_gold = classesDto.Starting_gold,
                SpellCaster = classesDto.SpellCaster,
                Armor_prof = classesDto.Armor_prof,
                Weapon_prof = classesDto.Weapon_prof,
                Tool_prof = classesDto.Tool_prof,
            };
        }
    }
}
