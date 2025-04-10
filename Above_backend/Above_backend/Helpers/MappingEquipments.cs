using Above_backend.Models.DTOs;
using Above_backend.Models;

namespace Above_backend.Helpers
{
    public class MappingEquipment
    {
        public static EquipmentsDisplayDTO EquipmentToEquipmentDisplayDTO(Equipment equipment)
        {
            return new EquipmentsDisplayDTO
            {
                Id = equipment.Id,
                Name = equipment.Name,
                Rarity = equipment.Rarity,
                ProfReq = equipment.ProfReq,
                DamageDie = equipment.DamageDie,
                DamageType = equipment.DamageType,
                EquipmentType = equipment.EquipmentType,
                Properties = equipment.Properties,
                AC = equipment.AC,
                Consumable = equipment.Consumable,
                Price = equipment.Price,
                Description = equipment.Description,
                Attunement = equipment.Attunement,
            };
        }
    }
}