interface Props {
  currentPage: number;
  onPageChange: (page: number) => void;
  max?: number;
}

export const Pagination = ({ currentPage, onPageChange, max }: Props) => (
  <div className="pagination">
    <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>Prev</button>
    <span>{currentPage}{max ? ` / ${max}` : ''}</span>
    <button onClick={() => onPageChange(currentPage + 1)} disabled={typeof max === 'number' ? currentPage >= max : false}>Next</button>
  </div>
);
