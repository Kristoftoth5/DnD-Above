using Above_backend.Models;
using Above_backend.Models.DTOs;
using Microsoft.Build.Framework;

namespace Above_backend.Helpers
{
    public class MappingSpells
    {
        public static SpellsDisplayDTO SpellsToSpellsDisplayDto(Spells spells)
        {
            return new SpellsDisplayDTO
            {
                Id = spells.Id,
                School = spells.School,
                Concentration = spells.Concentration,
                Name = spells.Name,
                Level = spells.Level,
                Description = spells.Description,
                Range = spells.Range,
                Duration = spells.Duration,
                Ritual = spells.Ritual,
                CastingTime = spells.CastingTime,
                Component = spells.Component,
                OriginClassId = spells.OriginClassId,
                OriginSubClassId = spells.OriginSubClassId,
                OriginEquipmentId = spells.OriginEquipmentId,
                OriginRaceId = spells.OriginRaceId,
            };
        }
    }
}
