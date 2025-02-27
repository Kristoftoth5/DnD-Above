using Above_backend.Models.DTOs;
using Above_backend.Models;

namespace Above_backend.Helpers
{
    public class MappingEquipment
    {
        public static EquipmentDTO EquipmentToEquipmentDTO(Equipment equipment)
        {
            return new EquipmentDTO
            {
                Name = equipment.Name,
                Rarity = equipment.Rarity,
                ProfReq = equipment.ProfReq,
                DamageDie = equipment.DamageDie,
                AC = equipment.AC,
                Consumable = equipment.Consumable,
                Price = equipment.Price,
                Description = equipment.Description,
                Attunement = equipment.Attunement,
            };
        }

        public static Equipment EquipmentDtoToEquipment(EquipmentDTO equipmentDto)
        {
            return new Equipment
            {
                Name = equipmentDto.Name,
                Rarity = equipmentDto.Rarity,
                ProfReq = equipmentDto.ProfReq,
                DamageDie = equipmentDto.DamageDie,
                AC = equipmentDto.AC,
                Consumable = equipmentDto.Consumable,
                Price = equipmentDto.Price,
                Description = equipmentDto.Description,
                Attunement = equipmentDto.Attunement,
            };
        }
    }
}
