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
        public async Task<ActionResult<IEnumerable<Spells>>> GetSpells()
        {
            return await _context.Spells.ToListAsync();
        }

        // GET: api/Spells/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Spells>> GetSpells(int id)
        {
            var onespell = await _context.Spells.FindAsync(id);

            if (onespell == null)
            {
                return NotFound();
            }

            return onespell;
        }

        [HttpGet("originclassid/{originclassid}")]
        public async Task<ActionResult<IEnumerable<Spells>>> GetSpellsByClassId(int originclassid)
        {
            var spellsdisplaydtolist = await _context.Spells.Where(x => x.LearnedBy.Contains(originclassid)).ToListAsync();

            if (spellsdisplaydtolist == null)
            {
                return NotFound();
            }

            return spellsdisplaydtolist;
        }
    }
}
