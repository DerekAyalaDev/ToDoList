import { useSearchContext } from "./SearchContext";

interface PaginationProps {
  totalPages: number;
}

export const Pagination = ({ totalPages }: PaginationProps) => {
  const { searchState, setSearchState } = useSearchContext();
  const currentPage = searchState.pageNumber || 0;

  const handlePageChange = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      pageNumber: page,
    }));
  };

  const pagesArray = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className="pagination-container">
      <ul className="pagination-list">
        {pagesArray.map((page) => (
          <li
            key={page}
            className={`pagination-item ${
              page === currentPage ? "active" : ""
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};
