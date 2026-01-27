import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Character,
  Episode,
  getCharacterById,
  getEpisodes,
} from "../Services/characterService";

export const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;

      setLoading(true);
      const data = await getCharacterById(Number(id));
      setCharacter(data);

      if (data.episodes && data.episodes.length > 0) {
        const ids = data.episodes.map((e) => e.split("/").pop()!);
        const eps = await getEpisodes(ids);
        setEpisodes(eps);
      }

      setLoading(false);
    };

    loadData();
  }, [id]);

  if (loading) return <p>Cargando personaje...</p>;
  if (!character) return <p>No encontrado</p>;

  const episodeIds = (character.episodes ?? [])
    .map((ep) => (typeof ep === "string" ? ep.split("/").pop() : String(ep)))
    .filter((v): v is string => Boolean(v));

  const sortedEpisodes = episodes.slice().sort((a, b) => {
    const parse = (code?: string) => {
      if (!code) return { s: 0, e: 0 };
      const m = code.match(/S(\d+)E(\d+)/i);
      if (!m) return { s: 0, e: 0 };
      return { s: parseInt(m[1], 10), e: parseInt(m[2], 10) };
    };
    const pa = parse(a.episode);
    const pb = parse(b.episode);
    if (pa.s !== pb.s) return pa.s - pb.s;
    return pa.e - pb.e;
  });

  return (
    <div className="max-w-3xl mx-auto p-4">
      <button
        className="mb-4 text-blue-600 hover:underline"
        onClick={() => navigate(-1)}
      >
        ← Volver
      </button>

      <div className="flex gap-6">
        <img
          src={character.image}
          alt={character.name}
          className="w-64 rounded"
        />

        <div>
          <h1 className="text-3xl font-bold">{character.name}</h1>
          <p><strong>Estado:</strong> {character.status}</p>
          <p><strong>Especie:</strong> {character.species}</p>
          <p><strong>Género:</strong> {character.gender ?? "Desconocido"}</p>
          <p><strong>Origen:</strong> {character.origin ?? "Desconocido"}</p>
          <p><strong>Ubicación:</strong> {character.location}</p>

          <h2 className="text-xl font-bold mt-4">Episodios</h2>

          <ul className="list-disc ml-6">
            {sortedEpisodes.map((ep) => (
              <li key={ep.id}>
                {ep.episode ?? "Ep"} — {ep.name} {ep.air_date ? <span className="text-sm text-gray-500">({ep.air_date})</span> : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
