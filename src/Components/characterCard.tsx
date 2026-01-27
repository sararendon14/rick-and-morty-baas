import { Character } from "../Services/characterService";

interface Props {
  character: Character;
  onClick?: () => void;
}

const translateStatus = (s: string) => {
  const v = (s || "").toLowerCase();
  if (v === "alive") return "Vivo";
  if (v === "dead") return "Muerto";
  return "Desconocido";
};

export const CharacterCard = ({ character, onClick }: Props) => (
  <div className="flip-card" onClick={onClick}>
    <div className="flip-card-inner">
      <div className="flip-card-front card">
        <img src={character.image} alt={character.name} className="card-image" />
        <h2 className="font-bold mt-2">{character.name}</h2>
        <p>{character.species} - {character.status}</p>
        <p>Location: {character.location}</p>
        <p className="text-sm text-gray-600">
          Episodios: {character.episodes?.length ?? 0}</p>

      </div>
      <div className="flip-card-back card">
        <h2 className="font-bold mb-2">{character.name}</h2>
        <p><strong>Estado:</strong> {translateStatus(character.status)}</p>
        <p><strong>Especie:</strong> {character.species}</p>
        <p><strong>Género:</strong> {character.gender ?? 'Desconocido'}</p>
        <p><strong>Origen:</strong> {character.origin ?? 'Desconocido'}</p>
        <p><strong>Ubicación:</strong> {character.location}</p>
        <p><strong>Episodios:</strong> {character.episodes?.length ?? 0}</p>
      </div>
    </div>
  </div>
);
