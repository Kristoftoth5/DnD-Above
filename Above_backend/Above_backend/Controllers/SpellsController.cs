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
    public class SpellsController : ControllerBase
    {
        private readonly AboveDBContext _context;

        public SpellsController(AboveDBContext context)
        {
            _context = context;
        }

        // GET: api/Spells
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SpellsDisplayDTO>>> GetSpells()
        {
            var spells = await _context.Spells.ToListAsync();

            return spells.Select(x => MappingSpells.SpellsToSpellsDisplayDto(x)).ToList();
        }

        // GET: api/Spells/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SpellsDisplayDTO>> GetSpells(int id)
        {
            var onespell = await _context.Spells.FindAsync(id);

            if (onespell == null)
            {
                return NotFound();
            }

            return MappingSpells.SpellsToSpellsDisplayDto(onespell);
        }

        [HttpGet("/originclassid/{originclassid}")]
        public async Task<ActionResult<IEnumerable<SpellsDisplayDTO>>> GetSpellsByClassId(int originclassid)
        {
            var SpellsDisplayDTOList = await _context.Spells.Where(x => x.LearnedBy.Contains(originclassid)).Select(x => MappingSpells.SpellsToSpellsDisplayDto(x)).ToListAsync();

            if (SpellsDisplayDTOList == null)
            {
                return NotFound();
            }

            return SpellsDisplayDTOList;
        }
        // PUT: api/Spells/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /*[HttpPut("{id}")]
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
        }*/

        // POST: api/Spells
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Spells>> PostSpells(SpellsCreateAndBaseDTO spellscreatedto)
        {
            var spells = new Spells
            {
                School = spellscreatedto.School,
                Concentration = spellscreatedto.Concentration,
                Name = spellscreatedto.Name,
                Level = spellscreatedto.Level,
                Description = spellscreatedto.Description,
                Range = spellscreatedto.Range,
                Duration = spellscreatedto.Duration,
                Ritual = spellscreatedto.Ritual,
                CastingTime = spellscreatedto.CastingTime,
                Component = spellscreatedto.Component,
                ComponentPrice = spellscreatedto.ComponentPrice,
                LearnedBy = spellscreatedto.LearnedBy,
                OriginEquipmentId = (spellscreatedto.OriginEquipmentId != 0) ? spellscreatedto.OriginEquipmentId : null,
            };

            _context.Spells.Add(spells);
            await _context.SaveChangesAsync();

            return Created();
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
