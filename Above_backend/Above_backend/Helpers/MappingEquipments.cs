using Above_backend.Models.DTOs;
using Above_backend.Models;

namespace Above_backend.Helpers
{
    public class MappingEquipment
    {
        public static EquipmentsDTO EquipmentToEquipmentDTO(Equipment equipment)
        {
            return new EquipmentsDTO
            {
                Id = equipment.Id,
                Name = equipment.Name,
                Rarity = equipment.Rarity,
                ProfReq = equipment.ProfReq,
                DamageDie = equipment.DamageDie,
                Properties = equipment.Properties,
                AC = equipment.AC,
                Consumable = equipment.Consumable,
                Price = equipment.Price,
                Description = equipment.Description,
                Attunement = equipment.Attunement,
            };
        }

        public static Equipment EquipmentDtoToEquipment(EquipmentsDTO equipmentDto)
        {
            return new Equipment
            {
                Name = equipmentDto.Name,
                Rarity = equipmentDto.Rarity,
                ProfReq = equipmentDto.ProfReq,
                DamageDie = equipmentDto.DamageDie,
                AC = equipmentDto.AC,
                Properties = equipmentDto.Properties,
                Consumable = equipmentDto.Consumable,
                Price = equipmentDto.Price,
                Description = equipmentDto.Description,
                Attunement = equipmentDto.Attunement,
            };
        }
    }
}