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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace Above_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SavesController : ControllerBase
    {
        private readonly AboveDBContext _context;

        public SavesController(AboveDBContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("userid/{userid}")]
        public async Task<ActionResult<IEnumerable<SavesBaseDisplayDTO>>> GetSaveByUserId(int userid)
        {
            var saves = await _context.Saves
                .Where(x => x.UserId == userid)
                .Select(x => MappingSaves.SavesToSavesBaseDisplayDTO(x))
                .ToListAsync();

            if (saves == null)
            {
                return NotFound();
            }

            return saves;
        }

        // GET: api/Saves/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<SavesSheetDisplayDTO>> GetSaveById(int id)
        {
            var save = await _context.Saves.FindAsync(id);

            if (save == null)
            {
                return NotFound();
            }

            return MappingSaves.SavesToSavesSheetDisplayDTO(save);
        }

        /*
        // PUT: api/Saves/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSaves(int id, Saves saves)
        {
            if (id != saves.Id)
            {
                return BadRequest();
            }

            _context.Entry(saves).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SavesExists(id))
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
        */

        // POST: api/Saves
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Saves>> PostSaves(SavesCreateDTO savescreatedto)
        {
            var UserClaim = User.Claims;
            var user = _context.Users.FindAsync();
            var Saves = new Saves
            {

            };
            _context.Saves.Add(MappingSaves.SavesCreateDTOToSaves(savescreatedto));
            await _context.SaveChangesAsync();

            return Created();
        }

        // DELETE: api/Saves/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSaves(int id)
        {
            var saves = await _context.Saves.FindAsync(id);
            if (saves == null)
            {
                return NotFound();
            }

            _context.Saves.Remove(saves);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
