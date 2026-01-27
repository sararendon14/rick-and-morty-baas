interface Props {
  name: string;
  status: string;
  species: string;
  onFilterChange: (filters: { name: string; status: string; species: string }) => void;
}

export const Filters = ({ name, status, species, onFilterChange }: Props) => (
  <div className="filters">
    <input
      className="filter-input"
      type="text"
      placeholder="Buscar por nombre"
      value={name}
      onChange={e => onFilterChange({ name: e.target.value, status, species })}
    />
    <input
      className="filter-input"
      type="text"
      placeholder="Filtrar por estado"
      value={status}
      onChange={e => onFilterChange({ name, status: e.target.value, species })}
    />
    <input
      className="filter-input"
      type="text"
      placeholder="Filtrar por especie"
      value={species}
      onChange={e => onFilterChange({ name, status, species: e.target.value })}
    />
  </div>
);
