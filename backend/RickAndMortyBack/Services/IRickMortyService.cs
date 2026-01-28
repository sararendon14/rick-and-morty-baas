using RickAndMortyBack.Models;

namespace RickAndMortyBack.Services
{
    public interface IRickMortyService
    {
        Task<IEnumerable<Character>> GetCharacters(
            string? name = null,
            string? status = null,
            string? species = null,
            int page = 1
        );

        Task<Character?> GetCharacterById(int id);
    }
}
