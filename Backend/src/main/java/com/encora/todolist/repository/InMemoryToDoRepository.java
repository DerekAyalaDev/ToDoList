package com.encora.todolist.repository;

import com.encora.todolist.dto.SearchDTO;
import com.encora.todolist.model.ToDo;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Repository
public class InMemoryToDoRepository implements ToDoRepository {

    // In-memory data store for ToDo items, using a map where the key is the ToDo ID
    private final Map<Long, ToDo> toDoStore = new HashMap<>();

    // Counter to generate unique IDs for ToDo items
    private Long currentId = 1L;

    /**
     * Constructor initializes the repository with sample ToDo items for testing purposes.
     * The ToDo items have different priorities ("Low", "Medium", "High") and done dates.
     */
    public InMemoryToDoRepository() {
        ToDo low1 = new ToDo();
        low1.setId(currentId++);
        low1.setText("Task 1");
        low1.setDone(true);
        low1.setDoneDate(LocalDateTime.of(2024, 9, 8, 12, 0));
        low1.setPriority("Low");
        low1.setCreationDate(LocalDateTime.of(2024, 9, 8, 10, 0));
        toDoStore.put(low1.getId(), low1);

        ToDo low2 = new ToDo();
        low2.setId(currentId++);
        low2.setText("Task 2");
        low2.setDone(true);
        low2.setDoneDate(LocalDateTime.of(2024, 9, 9, 11, 0));
        low2.setPriority("Low");
        low2.setCreationDate(LocalDateTime.of(2024, 9, 9, 10, 0));
        toDoStore.put(low2.getId(), low2);

        // Similar initialization for medium and high priority tasks
        ToDo medium1 = new ToDo();
        medium1.setId(currentId++);
        medium1.setText("Task 3");
        medium1.setDone(true);
        medium1.setDoneDate(LocalDateTime.of(2024, 9, 8, 14, 0));
        medium1.setPriority("Medium");
        medium1.setCreationDate(LocalDateTime.of(2024, 9, 8, 10, 0));
        toDoStore.put(medium1.getId(), medium1);

        ToDo medium2 = new ToDo();
        medium2.setId(currentId++);
        medium2.setText("Task 4");
        medium2.setDone(true);
        medium2.setDoneDate(LocalDateTime.of(2024, 9, 9, 13, 0));
        medium2.setPriority("Medium");
        medium2.setCreationDate(LocalDateTime.of(2024, 9, 9, 10, 0));
        toDoStore.put(medium2.getId(), medium2);

        ToDo high1 = new ToDo();
        high1.setId(currentId++);
        high1.setText("Task 5");
        high1.setDone(true);
        high1.setDoneDate(LocalDateTime.of(2024, 9, 8, 15, 0));
        high1.setPriority("High");
        high1.setCreationDate(LocalDateTime.of(2024, 9, 8, 10, 0));
        toDoStore.put(high1.getId(), high1);

        ToDo high2 = new ToDo();
        high2.setId(currentId++);
        high2.setText("Task 6");
        high2.setDone(true);
        high2.setDoneDate(LocalDateTime.of(2024, 9, 9, 14, 0));
        high2.setPriority("High");
        high2.setCreationDate(LocalDateTime.of(2024, 9, 9, 10, 0));
        toDoStore.put(high2.getId(), high2);
    }

    /**
     * Retrieves all ToDo items from the in-memory store.
     *
     * @return A list of all ToDo items.
     */
    @Override
    public List<ToDo> findAll() {
        return new ArrayList<>(toDoStore.values());
    }

    /**
     * Finds a ToDo item by its ID in the in-memory store.
     *
     * @param id The ID of the ToDo item to find.
     * @return An Optional containing the ToDo item if found, or empty if not found.
     */
    @Override
    public Optional<ToDo> findById(Long id) {
        return Optional.ofNullable(toDoStore.get(id));
    }

    /**
     * Saves a ToDo item to the in-memory store.
     * If the item does not have an ID, a new one is generated.
     *
     * @param toDo The ToDo item to save.
     */
    @Override
    public void save(ToDo toDo) {
        if (toDo.getId() == null) {
            toDo.setId(currentId++);
        }
        toDoStore.put(toDo.getId(), toDo);
    }

    /**
     * Deletes a ToDo item from the in-memory store.
     *
     * @param toDo The ToDo item to delete.
     */
    @Override
    public void delete(ToDo toDo) {
        toDoStore.remove(toDo.getId());
    }

    /**
     * Finds ToDo items based on criteria defined in the SearchDTO.
     * Filters include text (contains), priority, and state (done/undone).
     *
     * @param searchDTO The DTO containing the search filters.
     * @return A list of ToDo items that match the search criteria.
     */
    @Override
    public List<ToDo> findByCriteria(SearchDTO searchDTO) {
        return toDoStore.values().stream()
                .filter(todo -> searchDTO.getText() == null || searchDTO.getText().isBlank() || todo.getText().contains(searchDTO.getText()))
                .filter(todo -> searchDTO.getPriority() == null || searchDTO.getPriority().isBlank() || todo.getPriority().equalsIgnoreCase(searchDTO.getPriority()))
                .filter(todo -> searchDTO.getState() == null || searchDTO.getState().isBlank() || todo.getDone().toString().equalsIgnoreCase(searchDTO.getState()))
                .collect(Collectors.toList());
    }

    /**
     * Saves a list of ToDo items to the in-memory store.
     *
     * @param toDoList The list of ToDo items to save.
     */
    @Override
    public void saveAll(List<ToDo> toDoList) {
        for (ToDo toDo : toDoList) {
            save(toDo);
        }
    }

    /**
     * Deletes all ToDo items from the in-memory store.
     */
    @Override
    public void deleteAll() {
        toDoStore.clear();
    }
}

