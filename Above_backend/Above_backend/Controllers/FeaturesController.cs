using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Above_backend.Models;
using Above_backend.Models.DTOs;
using Above_backend.Helpers;

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

        [HttpGet("Features/originclassid/{originclassid}")]
        public async Task<ActionResult<IEnumerable<FeaturesDisplayDTO>>> GetFeaturesByClass(int originclassid)
        {
            var DisplayDtoFeaturesWithOriginClassId = await _context.Features.Where(x => x.OriginClassId == originclassid).Select(x => MappingFeatures.FeaturesToFeaturesDisplayDto(x)).ToListAsync();

            if (DisplayDtoFeaturesWithOriginClassId == null)
            {
                return NotFound();
            }

            return DisplayDtoFeaturesWithOriginClassId;
        }

        [HttpGet("Features/originsubclassid/{originsubclassid}")]
        public async Task<ActionResult<IEnumerable<FeaturesDisplayDTO>>> GetFeaturesBySubclass(int originsubclassid)
        {
            var DisplayDtoFeaturesWithOriginClassId = await _context.Features.Where(x => x.OriginSubClassId == originsubclassid).Select(x => MappingFeatures.FeaturesToFeaturesDisplayDto(x)).ToListAsync();

            if (DisplayDtoFeaturesWithOriginClassId == null)
            {
                return NotFound();
            }

            return DisplayDtoFeaturesWithOriginClassId;
        }

        [HttpGet("Features/originequipmentid/{originequipmentid}")]
        public async Task<ActionResult<IEnumerable<FeaturesDisplayDTO>>> GetFeaturesByEquipment(int originequipmentid)
        {
            var DisplayDtoFeaturesWithOriginClassId = await _context.Features.Where(x => x.OriginEquipmentId == originequipmentid).Select(x => MappingFeatures.FeaturesToFeaturesDisplayDto(x)).ToListAsync();

            if (DisplayDtoFeaturesWithOriginClassId == null)
            {
                return NotFound();
            }

            return DisplayDtoFeaturesWithOriginClassId;
        }

        [HttpGet("Features/originraceid/{originraceid}")]
        public async Task<ActionResult<IEnumerable<FeaturesDisplayDTO>>> GetFeaturesByRace(int originraceid)
        {
            var DisplayDtoFeaturesWithOriginClassId = await _context.Features.Where(x => x.OriginRaceId == originraceid).Select(x => MappingFeatures.FeaturesToFeaturesDisplayDto(x)).ToListAsync();

            if (DisplayDtoFeaturesWithOriginClassId == null)
            {
                return NotFound();
            }

            return DisplayDtoFeaturesWithOriginClassId;
        }

        // PUT: api/Features/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /*[HttpPut("{id}")]
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
        public async Task<ActionResult<Features>> PostFeatures(FeaturesCreateAndBaseDTO featurescreatedto)
        {
            var features = new Features
            {
                Name = featurescreatedto.Name,
                LevelReq = featurescreatedto.LevelReq,
                Description = featurescreatedto.Description,
                OriginClassId = (featurescreatedto.OriginClassId != 0) ? featurescreatedto.OriginClassId : null,
                OriginSubClassId = (featurescreatedto.OriginSubClassId != 0) ? featurescreatedto.OriginSubClassId : null,
                OriginRaceId = (featurescreatedto.OriginRaceId != 0) ? featurescreatedto.OriginRaceId : null,
                OriginEquipmentId = (featurescreatedto.OriginEquipmentId != 0) ? featurescreatedto.OriginEquipmentId : null,
                SkillProf = featurescreatedto.SkillProf,
                ArmorProf = featurescreatedto.ArmorProf,
                WeaponProf = featurescreatedto.WeaponProf,
                ToolProf = featurescreatedto.ToolProf,
                SavingThrows = featurescreatedto.SavingThrows,
            };

            _context.Features.Add(features);
            await _context.SaveChangesAsync();

            return Created();
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
        */
    }
}
