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
    public class EquipmentsController : ControllerBase
    {
        private readonly AboveDBContext _context;

        public EquipmentsController(AboveDBContext context)
        {
            _context = context;
        }

        // GET: api/Equipments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Equipment>>> GetEquipment()
        {

            return await _context.Equipments.ToListAsync();
        }

        // GET: api/Equipments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Equipment>> GetEquipment(int id)
        {
            var oneequipment = await _context.Equipments.FindAsync(id);

            if (oneequipment == null)
            {
                return NotFound();
            }

            return oneequipment;
        }
    }
}
