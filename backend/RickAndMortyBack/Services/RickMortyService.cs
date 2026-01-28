using System.Net.Http.Json;
using RickAndMortyBack.Models;
using RickAndMortyBack.Data;
using Microsoft.EntityFrameworkCore;

namespace RickAndMortyBack.Services
{
    public class RickMortyService : IRickMortyService
    {
        private readonly HttpClient _http;
        private readonly AppDbContext _db;

        public RickMortyService(HttpClient http, AppDbContext db)
        {
            _http = http;
            _db = db;
            _http.BaseAddress = new Uri("https://rickandmortyapi.com/api/");
        }

        public async Task<IEnumerable<Character>> GetCharacters(
            string? name = null,
            string? status = null,
            string? species = null,
            int page = 1)
        {
            var url = $"character?page={page}";
            if (!string.IsNullOrEmpty(name)) url += $"&name={name}";
            if (!string.IsNullOrEmpty(status)) url += $"&status={status}";
            if (!string.IsNullOrEmpty(species)) url += $"&species={species}";

            var response = await _http.GetFromJsonAsync<RickAndMortyResponse>(url);
            if (response == null || response.Results.Count == 0)
                return new List<Character>();

            var characters = response.Results.Select(c => new Character
            {
                Id = c.Id,
                Name = c.Name,
                Status = c.Status,
                Species = c.Species,
                Gender = c.Gender,
                Origin = c.Origin.Name,
                Location = c.Location.Name,
                Image = c.Image
            }).ToList();

            foreach (var character in characters)
            {
                var exists = await _db.Characters.AnyAsync(x => x.Id == character.Id);
                if (!exists)
                    _db.Characters.Add(character);
            }

            await _db.SaveChangesAsync();
            return characters;
        }

        public async Task<Character?> GetCharacterById(int id)
        {
            var existing = await _db.Characters.FindAsync(id);

            if (existing != null &&
                !string.IsNullOrEmpty(existing.Gender) &&
                !string.IsNullOrEmpty(existing.Origin) &&
                existing.Episodes != null &&
                existing.Episodes.Any())
            {
                return existing;
            }

            var response = await _http.GetFromJsonAsync<CharacterApi>($"character/{id}");
            if (response == null) return null;

            var character = existing ?? new Character { Id = response.Id };

            character.Name = response.Name;
            character.Status = response.Status;
            character.Species = response.Species;
            character.Gender = response.Gender;
            character.Origin = response.Origin.Name;
            character.Location = response.Location.Name;
            character.Image = response.Image;
            character.Episodes = response.Episode; 

            if (existing == null)
                _db.Characters.Add(character);

            await _db.SaveChangesAsync();
            return character;
        }

    }
}
