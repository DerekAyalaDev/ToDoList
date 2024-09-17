import { useSearchContext } from "./SearchContext";

interface PaginationProps {
  totalPages: number;
}

/**
 * A pagination component that generates a list of pages based on the total pages passed via props.
 * It allows navigation between pages and updates the global search context's `pageNumber` when a page is selected.
 *
 * @param {PaginationProps} props - The props for the Pagination component.
 * @param {number} props.totalPages - The total number of pages.
 */
export const Pagination = ({ totalPages }: PaginationProps) => {
  const { searchState, setSearchState } = useSearchContext();
  const currentPage = searchState.pageNumber || 0;

  /**
   * Handles page changes by updating the global search context.
   *
   * @param {number} page - The new page number selected.
   */
  const handlePageChange = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      pageNumber: page,
    }));
  };

  // Create an array of page numbers based on the total number of pages
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

