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
    public class SpellsController : ControllerBase
    {
        private readonly AboveDBContext _context;

        public SpellsController(AboveDBContext context)
        {
            _context = context;
        }

        // GET: api/Spells
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Spells>>> GetSpells()
        {
            return await _context.Spells.ToListAsync();
        }

        // GET: api/Spells/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Spells>> GetSpells(int id)
        {
            var spells = await _context.Spells.FindAsync(id);

            if (spells == null)
            {
                return NotFound();
            }

            return spells;
        }

        // PUT: api/Spells/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSpells(int id, Spells spells)
        {
            if (id != spells.Id)
            {
                return BadRequest();
            }

            _context.Entry(spells).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SpellsExists(id))
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

        // POST: api/Spells
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Spells>> PostSpells(Spells spells)
        {
            _context.Spells.Add(spells);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSpells", new { id = spells.Id }, spells);
        }

        // DELETE: api/Spells/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSpells(int id)
        {
            var spells = await _context.Spells.FindAsync(id);
            if (spells == null)
            {
                return NotFound();
            }

            _context.Spells.Remove(spells);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SpellsExists(int id)
        {
            return _context.Spells.Any(e => e.Id == id);
        }
    }
}
