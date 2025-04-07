using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Above_backend.Models;
using Above_backend.Helpers;
using Above_backend.Models.DTOs;

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
        public async Task<ActionResult<IEnumerable<RacesDisplayDTO>>> GetRaces()
        {
            var races = await _context.Races.ToListAsync();

            return races.Select(x => MappingRaces.RacesToRacesDisplayDTO(x)).ToList();
        }

        // GET: api/Races/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RacesDisplayDTO>> GetRaces(int id)
        {
            var onerace = await _context.Races.FindAsync(id);

            if (onerace == null)
            {
                return NotFound();
            }

            return MappingRaces.RacesToRacesDisplayDTO(onerace);
        }

        // PUT: api/Races/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /*[HttpPut("{id}")]
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
        public async Task<ActionResult<Races>> PostRaces(RacesCreateAndBaseDTO racescreatedto)
        {
            _context.Races.Add(MappingRaces.RaceCreateDTOToRaces(racescreatedto));
            await _context.SaveChangesAsync();

            return Created();
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
        */
    }
}
