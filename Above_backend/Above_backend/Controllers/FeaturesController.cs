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
        public async Task<ActionResult<IEnumerable<Features>>> GetFeatures()
        {
            return await _context.Features.ToListAsync();
        }

        // GET: api/Features/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Features>> GetFeatures(int id)
        {
            var feature = await _context.Features.FindAsync(id);

            if (feature == null)
            {
                return NotFound();
            }

            return feature;
        }

        [HttpGet("originclassid/{originclassid}")]
        public async Task<ActionResult<IEnumerable<Features>>> GetFeaturesByClass(int originclassid)
        {
            var featuresbyoriginclassid = await _context.Features.Where(x => x.OriginClassId == originclassid).ToListAsync();

            if (featuresbyoriginclassid == null)
            {
                return NotFound();
            }

            return featuresbyoriginclassid;
        }

        [HttpGet("originsubclassid/{originsubclassid}")]
        public async Task<ActionResult<IEnumerable<Features>>> GetFeaturesBySubclass(int originsubclassid)
        {
            var featuresbyoriginsubclassid = await _context.Features.Where(x => x.OriginSubClassId == originsubclassid).ToListAsync();

            if (featuresbyoriginsubclassid == null)
            {
                return NotFound();
            }

            return featuresbyoriginsubclassid;
        }

        [HttpGet("originequipmentid/{originequipmentid}")]
        public async Task<ActionResult<IEnumerable<Features>>> GetFeaturesByEquipment(int originequipmentid)
        {
            var featuresbyoriginequpmentid = await _context.Features.Where(x => x.OriginEquipmentId == originequipmentid).ToListAsync();

            if (featuresbyoriginequpmentid == null)
            {
                return NotFound();
            }

            return featuresbyoriginequpmentid;
        }

        [HttpGet("originraceid/{originraceid}")]
        public async Task<ActionResult<IEnumerable<Features>>> GetFeaturesByRace(int originraceid)
        {
            var featuresbyoriginequpmentid = await _context.Features.Where(x => x.OriginRaceId == originraceid).ToListAsync();

            if (featuresbyoriginequpmentid == null)
            {
                return NotFound();
            }

            return featuresbyoriginequpmentid;
        }
    }
}
