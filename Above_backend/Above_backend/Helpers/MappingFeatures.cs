<<<<<<< Updated upstream
﻿namespace Above_backend.Helpers
{
    public class MappingFeatures
    {

    }
}
=======
﻿using Above_backend.Models.DTOs;
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
                Armor_prof = feature.Armor_prof,
                Weapon_prof = feature.Weapon_prof,
                Tool_prof = feature.Tool_prof,
                Saving_throws = feature.Saving_throws,
            };
        }
    }
}
>>>>>>> Stashed changes
