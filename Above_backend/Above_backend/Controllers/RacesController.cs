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
        public async Task<ActionResult<IEnumerable<Races>>> GetRaces()
        {
            return await _context.Races.ToListAsync();
        }

        // GET: api/Races/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Races>> GetRaces(int id)
        {
            var onerace = await _context.Races.FindAsync(id);

            if (onerace == null)
            {
                return NotFound();
            }

            return onerace;
        }
    }
}
