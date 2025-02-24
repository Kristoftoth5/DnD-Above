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
            var features = await _context.Features.FindAsync(id);

            if (features == null)
            {
                return NotFound();
            }

            return features;
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
