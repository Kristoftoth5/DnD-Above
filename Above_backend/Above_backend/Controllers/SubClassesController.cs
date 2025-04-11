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
    public class SubClassesController : ControllerBase
    {
        private readonly AboveDBContext _context;

        public SubClassesController(AboveDBContext context)
        {
            _context = context;
        }

        // GET: api/SubClasses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubClasses>>> GetSubClasses()
        {
            return await _context.SubClasses.ToListAsync();
        }

        // GET: api/SubClasses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubClasses>> GetSubClasses(int id)
        {
            var onesubClass = await _context.SubClasses.FindAsync(id);

            if (onesubClass == null)
            {
                return NotFound();
            }

            return onesubClass;
        }

        [HttpGet("originclassid/{originclassid}")]
        public async Task<ActionResult<IEnumerable<SubClasses>>> GetSubClassesByOriginClassId(int originclassid)
        {
            var requestedsubclasses = await _context.SubClasses.Where(x => x.OriginClassId == originclassid).ToListAsync();

            if (requestedsubclasses == null)
            {
                return NotFound();
            }

            return requestedsubclasses;
        }
    }
}
