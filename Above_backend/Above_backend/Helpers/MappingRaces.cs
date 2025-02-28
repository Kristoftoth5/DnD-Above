using Above_backend.Models.DTOs;
using Above_backend.Models;

namespace Above_backend.Helpers
{
    public class MappingRaces
    {
        public static RacesDTO RacesToRacesDTO(Races races)
        {
            return new RacesDTO
            {
                Name = races.Name,
                CreatureType = races.CreatureType,
                Age = races.Age,
                Size = races.Size,
                Speed = races.Speed,
            };
        }

        public static Races EquipmentDtoToEquipment(RacesDTO racesDto)
        {
            return new Races
            {
                Name = racesDto.Name,
                CreatureType = racesDto.CreatureType,
                Age = racesDto.Age,
                Size = racesDto.Size,
                Speed = racesDto.Speed,
            };
        }
    }
}