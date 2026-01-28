using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

public class Character
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Status { get; set; } = null!;
    public string Species { get; set; } = null!;
    public string Image { get; set; } = null!;
    public string Location { get; set; } = null!;
    public string Gender { get; set; } = null!;
    public string Origin { get; set; } = null!;

   
    public string EpisodesJson { get; set; } = "[]";

   
    [NotMapped]
    public List<string> Episodes
    {
        get => JsonSerializer.Deserialize<List<string>>(EpisodesJson) ?? new();
        set => EpisodesJson = JsonSerializer.Serialize(value);
    }
}


public class RickAndMortyResponse
    {
        public Info Info { get; set; } = new Info();
        public List<CharacterApi> Results { get; set; } = new List<CharacterApi>();
    }

    public class Info
    {
        public int Count { get; set; }
        public int Pages { get; set; }
        public string? Next { get; set; }
        public string? Prev { get; set; }
    }

    public class CharacterApi
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Status { get; set; } = "";
        public string Species { get; set; } = "";
        public string Image { get; set; } = "";
        public LocationApi Location { get; set; } = new LocationApi();
        public string Gender { get; set; } = "";
        public OriginApi Origin { get; set; } = new OriginApi();
        public List<string> Episode { get; set; } = new List<string>();
    }

    public class LocationApi
    {
        public string Name { get; set; } = "";
    }

    public class OriginApi
    {
        public string Name { get; set; } = "";
    }

