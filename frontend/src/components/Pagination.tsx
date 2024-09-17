import React, { useState, useEffect } from "react";
import { useSearchContext } from "./SearchContext";

export const Pagination = () => {
  const { searchState, setSearchState } = useSearchContext();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pages, setPages] = useState<number[]>([]);
  const currentPage = searchState.pageNumber || 0;

  // Función para obtener el total de páginas del backend
  const fetchTotalPages = () => {
    const queryParams = new URLSearchParams({
      text: searchState.text || "",
      priority: searchState.priority || "",
      state: searchState.state || "",
      sortByPriority: searchState.sortByPriority || "",
      sortByDueDate: searchState.sortByDueDate || "",
      pageNumber: searchState.pageNumber.toString(),
    }).toString();

    fetch(`http://localhost:9090/api/todos/pages?${queryParams}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching total pages");
        }
        return response.json();
      })
      .then((data: { totalPages: number }) => {
        setTotalPages(data.totalPages);
        generatePages(data.totalPages); // Generar las páginas cuando se recibe el total
      })
      .catch((error) => {
        console.error("Error fetching total pages:", error);
      });
  };

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

  useEffect(() => {
    fetchTotalPages(); // Llamar a la API al cargar el componente
  }, [searchState]); // Se llama cada vez que cambia el searchState

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
