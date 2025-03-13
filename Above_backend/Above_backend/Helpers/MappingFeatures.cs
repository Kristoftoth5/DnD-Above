using Above_backend.Models.DTOs;
using Above_backend.Models;

namespace Above_backend.Helpers
{
    public class MappingFeatures
    {
        public static FeaturesDisplayDTO FeaturesToFeaturesDisplayDto(Features feature)
        {
            return new FeaturesDisplayDTO
            {
                Id = feature.Id,
                Name = feature.Name,
                LevelReq = feature.LevelReq,
                Description = feature.Description,
                OriginClassId = feature.OriginClassId,
                OriginSubClassId = feature.OriginSubClassId,
                OriginEquipmentId = feature.OriginEquipmentId,
                OriginRaceId = feature.OriginRaceId,
                ArmorProf = feature.ArmorProf,
                WeaponProf = feature.WeaponProf,
                ToolProf = feature.ToolProf,
                SavingThrows = feature.SavingThrows,
                SkillProf = feature.SkillProf,
            };
        }
    }
}