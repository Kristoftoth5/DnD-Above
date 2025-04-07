using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Above_backend.Models;

namespace Above_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeaturesToFeaturesConnectionsController : ControllerBase
    {
        private readonly AboveDBContext _context;

        public FeaturesToFeaturesConnectionsController(AboveDBContext context)
        {
            _context = context;
        }

        // GET: api/FeaturesToFeaturesConnections
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FeaturesToFeaturesConnection>>> GetFeaturesToFeaturesConnections()
        {
            return await _context.FeaturesToFeaturesConnections.ToListAsync();
        }

        // GET: api/FeaturesToFeaturesConnections/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FeaturesToFeaturesConnection>> GetFeaturesToFeaturesConnection(int id)
        {
            var featuresToFeaturesConnection = await _context.FeaturesToFeaturesConnections.FindAsync(id);

            if (featuresToFeaturesConnection == null)
            {
                return NotFound();
            }

            return featuresToFeaturesConnection;
        }

        [HttpGet("/originsubclassid/{originsubclassid}")]
        public async Task<ActionResult<IEnumerable<Features>>> GetFeaturesToFeaturesConnectionByOriginId(int originid)
        {
            var SubFeatureIds = await _context.FeaturesToFeaturesConnections.Where(x => x.OriginFeatureId == originid).Select(x => x.SubFeatureId).ToListAsync();

            if (SubFeatureIds == null)
            {
                return NotFound();
            }

            List<Features> GetFeaturesBySubId = [];
            foreach (var OneSubFeatureId in SubFeatureIds)
            { 
                GetFeaturesBySubId.Add(await _context.Features.FindAsync(OneSubFeatureId));
            }
                
            return GetFeaturesBySubId;
        }

        /*
        // PUT: api/FeaturesToFeaturesConnections/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFeaturesToFeaturesConnection(int id, FeaturesToFeaturesConnection featuresToFeaturesConnection)
        {
            if (id != featuresToFeaturesConnection.Id)
            {
                return BadRequest();
            }

            _context.Entry(featuresToFeaturesConnection).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FeaturesToFeaturesConnectionExists(id))
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

        // POST: api/FeaturesToFeaturesConnections
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FeaturesToFeaturesConnection>> PostFeaturesToFeaturesConnection(FeaturesToFeaturesConnection featuresToFeaturesConnection)
        {
            _context.FeaturesToFeaturesConnections.Add(new FeaturesToFeaturesConnection 
            {
                OriginFeatureId = featuresToFeaturesConnection.OriginFeatureId,
                SubFeatureId = featuresToFeaturesConnection.SubFeatureId,
            });
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFeaturesToFeaturesConnection", new { id = featuresToFeaturesConnection.Id }, featuresToFeaturesConnection);
        }

        // DELETE: api/FeaturesToFeaturesConnections/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFeaturesToFeaturesConnection(int id)
        {
            var featuresToFeaturesConnection = await _context.FeaturesToFeaturesConnections.FindAsync(id);
            if (featuresToFeaturesConnection == null)
            {
                return NotFound();
            }

            _context.FeaturesToFeaturesConnections.Remove(featuresToFeaturesConnection);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FeaturesToFeaturesConnectionExists(int id)
        {
            return _context.FeaturesToFeaturesConnections.Any(e => e.Id == id);
        }
        */
    }
}
