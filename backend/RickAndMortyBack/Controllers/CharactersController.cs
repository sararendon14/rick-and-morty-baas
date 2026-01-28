using Microsoft.AspNetCore.Mvc;
using RickAndMortyBack.Models;
using RickAndMortyBack.Services;

namespace RickAndMortyBack.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CharactersController : ControllerBase
    {
        private readonly IRickMortyService _service;

        public CharactersController(IRickMortyService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string? name, string? status, string? species, int page = 1)
        {
            var characters = await _service.GetCharacters(name, status, species, page);
            return Ok(characters);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var character = await _service.GetCharacterById(id);
            if (character == null) return NotFound();
            return Ok(character);
        }
    }
}
