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
    }
}