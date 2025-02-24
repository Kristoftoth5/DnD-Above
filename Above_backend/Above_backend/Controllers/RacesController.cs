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
    public class RacesController : ControllerBase
    {
        private readonly AboveDBContext _context;

        public RacesController(AboveDBContext context)
        {
            _context = context;
        }

        // GET: api/Races
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Races>>> GetRaces()
        {
            return await _context.Races.ToListAsync();
        }

        // GET: api/Races/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Races>> GetRaces(int id)
        {
            var races = await _context.Races.FindAsync(id);

            if (races == null)
            {
                return NotFound();
            }

            return races;
        }

        // PUT: api/Races/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRaces(int id, Races races)
        {
            if (id != races.Id)
            {
                return BadRequest();
            }

            _context.Entry(races).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RacesExists(id))
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

        // POST: api/Races
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Races>> PostRaces(Races races)
        {
            _context.Races.Add(races);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRaces", new { id = races.Id }, races);
        }

        // DELETE: api/Races/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRaces(int id)
        {
            var races = await _context.Races.FindAsync(id);
            if (races == null)
            {
                return NotFound();
            }

            _context.Races.Remove(races);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RacesExists(int id)
        {
            return _context.Races.Any(e => e.Id == id);
        }
    }
}
