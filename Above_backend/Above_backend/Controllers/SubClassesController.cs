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
    public class SubClassesController : ControllerBase
    {
        private readonly AboveDBContext _context;

        public SubClassesController(AboveDBContext context)
        {
            _context = context;
        }

        // GET: api/SubClasses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubClassesDisplayDTO>>> GetSubClasses()
        {
            var subclasses = await _context.SubClasses.ToListAsync();

            return subclasses.Select(x => MappingSubClasses.SubClassesToSubClassesDisplayDTO(x)).ToList();
        }

        // GET: api/SubClasses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubClassesDisplayDTO>> GetSubClasses(int id)
        {
            var subClass = await _context.SubClasses.FindAsync(id);

            if (subClass == null)
            {
                return NotFound();
            }

            return MappingSubClasses.SubClassesToSubClassesDisplayDTO(subClass);
        }

        // PUT: api/SubClasses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubClasses(int id, SubClasses subClasses)
        {
            if (id != subClasses.Id)
            {
                return BadRequest();
            }

            _context.Entry(subClasses).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubClassesExists(id))
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

        // POST: api/SubClasses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SubClasses>> PostSubClasses(SubClasses subClasses)
        {
            _context.SubClasses.Add(subClasses);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubClasses", new { id = subClasses.Id }, subClasses);
        }

        // DELETE: api/SubClasses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubClasses(int id)
        {
            var subClasses = await _context.SubClasses.FindAsync(id);
            if (subClasses == null)
            {
                return NotFound();
            }

            _context.SubClasses.Remove(subClasses);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubClassesExists(int id)
        {
            return _context.SubClasses.Any(e => e.Id == id);
        }
    }
}
