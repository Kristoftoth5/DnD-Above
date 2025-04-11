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
            var featuresTofeaturesconnection = await _context.FeaturesToFeaturesConnections.FindAsync(id);

            if (featuresTofeaturesconnection == null)
            {
                return NotFound();
            }

            return featuresTofeaturesconnection;
        }

        [HttpGet("originfeatureid/{originid}")]
        public async Task<ActionResult<IEnumerable<Features>>> GetFeaturesToFeaturesConnectionByOriginId(int originid)
        {
            var subfeatures = await _context.FeaturesToFeaturesConnections.Where(x => x.OriginFeatureId == originid).Select(x => x.SubFeature).ToListAsync();
            
            if (subfeatures == null)
            {
                return NotFound();
            }

            return subfeatures;
        }
    }
}
