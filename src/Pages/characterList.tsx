import { useEffect, useState } from "react";
import { Character, getCharacters } from "../Services/characterService";
import { CharacterCard } from "../Components/characterCard";
import { Pagination } from "../Components/pagination";
import { Filters } from "../Components/filters";

export const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
  const [filters, setFilters] = useState({ name: "", status: "", species: "" });

  const fetchCharacters = async (p: number) => {
    try {
      setLoading(true);
      const data = await getCharacters(p, filters.name, filters.status, filters.species);
      setCharacters(data.results);
      setTotalPages(data.info?.pages ?? undefined);
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(page);
  }, [page, filters]);

  return (
    <div className="container content-center">
      <h1 className="text-2xl font-bold mb-4 page-header text-center">Personajes de Rick And Morty</h1>
      <Filters
        name={filters.name}
        status={filters.status}
        species={filters.species}
        onFilterChange={setFilters}
      />
      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && characters.length === 0 && <p>Sin resultados</p>}
      <div className="grid">
        {characters.map(c => (
          <CharacterCard key={c.id} character={c} />
        ))}
      </div>
      <Pagination currentPage={page} onPageChange={setPage} max={totalPages} />
    </div>
  );
};
