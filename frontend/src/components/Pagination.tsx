import React, { useState, useEffect } from "react";
import { useSearchContext } from "./SearchContext";

interface PaginationProps {
  totalPages: number;
}

export const Pagination = ({ totalPages }: PaginationProps) => {
  const { searchState, setSearchState } = useSearchContext();
  const [pages, setPages] = useState<number[]>([]);
  const currentPage = searchState.pageNumber || 0;

  // Función para generar las páginas y centrar la actual
  const generatePages = (total: number) => {
    const visiblePages = 5; // Mostrar 5 páginas visibles a la vez
    const startPage = Math.max(0, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(total - 1, startPage + visiblePages - 1);

    const pagesArray = [];
    for (let i = startPage; i <= endPage; i++) {
      pagesArray.push(i);
    }
    setPages(pagesArray);
  };

  // Llamar a generatePages cuando totalPages o currentPage cambian
  useEffect(() => {
    generatePages(totalPages);
  }, [totalPages, currentPage]);

  // Función para manejar el cambio de página
  const handlePageChange = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      pageNumber: page,
    }));
  };

  return (
    <div className="pagination-container">
      <ul className="pagination-list">
        {pages.map((page) => (
          <li
            key={page}
            className={`pagination-item ${page === currentPage ? "active" : ""}`}
            onClick={() => handlePageChange(page)}
          >
            {page + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};
