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
                Properties = equipment.Properties,
                AC = equipment.AC,
                Consumable = equipment.Consumable,
                Price = equipment.Price,
                Description = equipment.Description,
                Attunement = equipment.Attunement,
            };
        }

        public static Equipment EquipmentCreateDtoToEquipment(EquipmentsCreateAndBaseDTO equipmentcreatedto)
        {
            return new Equipment
            {
                Name = equipmentcreatedto.Name,
                Rarity = equipmentcreatedto.Rarity,
                ProfReq = equipmentcreatedto.ProfReq,
                DamageDie = equipmentcreatedto.DamageDie,
                AC = equipmentcreatedto.AC,
                Properties = equipmentcreatedto.Properties,
                Consumable = equipmentcreatedto.Consumable,
                Price = equipmentcreatedto.Price,
                Description = equipmentcreatedto.Description,
                Attunement = equipmentcreatedto.Attunement,
            };
        }
    }
}