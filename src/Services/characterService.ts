import axios from "axios";

const API_URL = "https://localhost:5001/api";
const PUBLIC_CHARACTER_API = "https://rickandmortyapi.com/api/character";

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender?: string;
  origin?: string;
  location: string;
  image: string;
  episodes?: string[];
}

export interface Episode {
  id: number;
  name: string;
  episode: string;
  air_date: string;
}

export const getCharacters = async (
  page: number,
  name?: string,
  status?: string,
  species?: string
) => {
  try {
    const res = await axios.get(`${API_URL}/characters`, {
      params: { page, name, status, species },
      timeout: 5000,
    });
    return res.data;
  } catch (err) {
    // fallback to public API
    const params: any = { page };
    if (name) params.name = name;
    if (status) params.status = status;
    if (species) params.species = species;
    const res = await axios.get(PUBLIC_CHARACTER_API, { params });
    // map public API response to expected shape
    const json = res.data;
    const rawResults = Array.isArray(json) ? json : json.results ?? [];
    const mapped = rawResults.map((r: any) => ({
      id: r.id,
      name: r.name,
      status: r.status,
      species: r.species,
      gender: r.gender,
      image: r.image,
      origin: typeof r.origin === "string" ? r.origin : r.origin?.name ?? "unknown",
      location: typeof r.location === "string" ? r.location : r.location?.name ?? "unknown",
      episodes: r.episode ?? r.episodes ?? [],
    }));
    return { results: mapped, info: json.info ? { pages: json.info.pages, count: json.info.count } : undefined };
  }
};

export const getCharacterById = async (id: number): Promise<Character> => {
  try {
    const res = await axios.get(`${API_URL}/characters/${id}`, { timeout: 5000 });
    return res.data;
  } catch (err) {
    // fallback to public API
    const res = await axios.get(`${PUBLIC_CHARACTER_API}/${id}`);
    const r = res.data;
    return {
      id: r.id,
      name: r.name,
      status: r.status,
      species: r.species,
      gender: r.gender,
      image: r.image,
      origin: typeof r.origin === "string" ? r.origin : r.origin?.name ?? "unknown",
      location: typeof r.location === "string" ? r.location : r.location?.name ?? "unknown",
      episodes: r.episode ?? r.episodes ?? [],
    };
  }
};

export const getEpisodes = async (ids: string[]): Promise<Episode[]> => {
  if (ids.length === 0) return [];

  const res = await axios.get(
    `https://rickandmortyapi.com/api/episode/${ids.join(",")}`
  );

  return Array.isArray(res.data) ? res.data : [res.data];
};

