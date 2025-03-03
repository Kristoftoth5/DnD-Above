using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Above_backend.Models;
<<<<<<< Updated upstream
=======
using Above_backend.Models.DTOs;
using Above_backend.Helpers;
>>>>>>> Stashed changes

namespace Above_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeaturesController : ControllerBase
    {
        private readonly AboveDBContext _context;

        public FeaturesController(AboveDBContext context)
        {
            _context = context;
        }

        // GET: api/Features
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FeaturesDisplayDTO>>> GetFeatures()
        {
            var features = await _context.Features.ToListAsync();

            return features.Select(x => MappingFeatures.FeaturesToFeaturesDisplayDto(x)).ToList();
        }

        // GET: api/Features/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FeaturesDisplayDTO>> GetFeatures(int id)
        {
            var feature = await _context.Features.FindAsync(id);

            if (feature == null)
            {
                return NotFound();
            }

            return MappingFeatures.FeaturesToFeaturesDisplayDto(feature);
        }

        // PUT: api/Features/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFeatures(int id, Features features)
        {
            if (id != features.Id)
            {
                return BadRequest();
            }

            _context.Entry(features).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FeaturesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Features
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Features>> PostFeatures(Features features)
        {
<<<<<<< Updated upstream
=======
            /*Features features;
            if (featurescreatedto.OriginClassId != 0)
            { 
                Classes originclass = await _context.Classes.FindAsync(featurescreatedto.OriginClassId);
                features = new Features
                {
                    Name = featurescreatedto.Name,
                    LevelReq = featurescreatedto.LevelReq,
                    Description = featurescreatedto.Description,
                    OriginClass = originclass,
                    Armor_prof = featurescreatedto.Armor_prof,
                    Weapon_prof = featurescreatedto.Weapon_prof,
                    Tool_prof = featurescreatedto.Tool_prof,
                    Saving_throws = featurescreatedto.Saving_throws,
                };
            }
            else if (featurescreatedto.OriginSubClassId >= 1)
            {
                SubClasses originsubclass = await _context.SubClasses.FindAsync(featurescreatedto.OriginSubClassId);
                features = new Features
                {
                    Name = featurescreatedto.Name,
                    LevelReq = featurescreatedto.LevelReq,
                    Description = featurescreatedto.Description,
                    OriginSubClass = originsubclass,
                    Armor_prof = featurescreatedto.Armor_prof,
                    Weapon_prof = featurescreatedto.Weapon_prof,
                    Tool_prof = featurescreatedto.Tool_prof,
                    Saving_throws = featurescreatedto.Saving_throws,
                };
            }
            else if (featurescreatedto.OriginEquipmentId >= 1)
            {
                Equipment originequipment = await _context.Equipment.FindAsync(featurescreatedto.OriginEquipmentId);
                features = new Features
                {
                    Name = featurescreatedto.Name,
                    LevelReq = featurescreatedto.LevelReq,
                    Description = featurescreatedto.Description,
                    OriginEquipment = originequipment,
                    Armor_prof = featurescreatedto.Armor_prof,
                    Weapon_prof = featurescreatedto.Weapon_prof,
                    Tool_prof = featurescreatedto.Tool_prof,
                    Saving_throws = featurescreatedto.Saving_throws,
                };
            }
            else
            {
                Races originrace = await _context.Races.FindAsync(featurescreatedto.OriginRaceId);
                features = new Features
                {
                    Name = featurescreatedto.Name,
                    LevelReq = featurescreatedto.LevelReq,
                    Description = featurescreatedto.Description,
                    OriginRace = originrace,
                    Armor_prof = featurescreatedto.Armor_prof,
                    Weapon_prof = featurescreatedto.Weapon_prof,
                    Tool_prof = featurescreatedto.Tool_prof,
                    Saving_throws = featurescreatedto.Saving_throws,
                };
            }*/

            var features = new Features
            {
                Name = featurescreatedto.Name,
                LevelReq = featurescreatedto.LevelReq,
                Description = featurescreatedto.Description,
                OriginClass = (featurescreatedto.OriginClassId != 0) ? await _context.Classes.FindAsync(featurescreatedto.OriginClassId) : null,
                OriginSubClass = (featurescreatedto.OriginSubClassId != 0) ? await _context.SubClasses.FindAsync(featurescreatedto.OriginSubClassId) : null,
                OriginRace = (featurescreatedto.OriginRaceId != 0) ? await _context.Races.FindAsync(featurescreatedto.OriginRaceId) : null,
                OriginEquipment = (featurescreatedto.OriginEquipmentId != 0) ? await _context.Equipments.FindAsync(featurescreatedto.OriginEquipmentId) : null,
                Armor_prof = featurescreatedto.Armor_prof,
                Weapon_prof = featurescreatedto.Weapon_prof,
                Tool_prof = featurescreatedto.Tool_prof,
                Saving_throws = featurescreatedto.Saving_throws,
            };

>>>>>>> Stashed changes
            _context.Features.Add(features);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFeatures", new { id = features.Id }, features);
        }

        // DELETE: api/Features/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFeatures(int id)
        {
            var features = await _context.Features.FindAsync(id);
            if (features == null)
            {
                return NotFound();
            }

            _context.Features.Remove(features);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FeaturesExists(int id)
        {
            return _context.Features.Any(e => e.Id == id);
        }
    }
}
