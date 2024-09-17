package com.encora.todolist.repository;

import com.encora.todolist.dto.SearchDTO;
import com.encora.todolist.model.ToDo;

import java.util.List;
import java.util.Optional;

public interface ToDoRepository {

    /**
     * Retrieves all ToDo items from the repository.
     *
     * @return A list of all ToDo items.
     */
    List<ToDo> findAll();

    /**
     * Finds a ToDo item by its ID.
     *
     * @param id The ID of the ToDo item.
     * @return An Optional containing the ToDo item if found, or empty if not found.
     */
    Optional<ToDo> findById(Long id);

    /**
     * Saves a ToDo item to the repository. If the ToDo item has no ID,
     * a new ID is generated and assigned.
     *
     * @param toDo The ToDo item to save.
     */
    void save(ToDo toDo);

    /**
     * Deletes a ToDo item from the repository.
     *
     * @param toDo The ToDo item to delete.
     */
    void delete(ToDo toDo);

    /**
     * Finds ToDo items based on criteria defined in the SearchDTO.
     * Filters can include text, priority, and state (done/undone).
     *
     * @param searchDTO The DTO containing the search filters.
     * @return A list of ToDo items matching the criteria.
     */
    List<ToDo> findByCriteria(SearchDTO searchDTO);

    /**
     * Deletes all ToDo items from the repository.
     */
    void deleteAll();

    /**
     * Saves a list of ToDo items to the repository.
     *
     * @param toDoList The list of ToDo items to save.
     */
    void saveAll(List<ToDo> toDoList);
}

