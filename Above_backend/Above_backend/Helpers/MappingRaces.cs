using Above_backend.Models.DTOs;
using Above_backend.Models;

namespace Above_backend.Helpers
{
    public class MappingRaces
    {
        public static RacesDisplayDTO RacesToRacesDisplayDTO(Races races)
        {
            return new RacesDisplayDTO
            {
                Id = races.Id,
                Name = races.Name,
                CreatureType = races.CreatureType,
                Age = races.Age,
                Size = races.Size,
                Speed = races.Speed,
            };
        }

        public static Races RaceCreateDTOToRaces(RacesCreateAndBaseDTO racescreatedto)
        {
            return new Races
            {
                Name = racescreatedto.Name,
                CreatureType = racescreatedto.CreatureType,
                Age = racescreatedto.Age,
                Size = racescreatedto.Size,
                Speed = racescreatedto.Speed,
            };
        }
    }
}