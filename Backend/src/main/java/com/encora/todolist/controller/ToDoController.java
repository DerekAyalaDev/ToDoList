package com.encora.todolist.controller;

import com.encora.todolist.dto.ListToDoDTO;
import com.encora.todolist.dto.MetricsDTO;
import com.encora.todolist.dto.SearchDTO;
import com.encora.todolist.dto.ToDoDTO;
import com.encora.todolist.service.ToDoService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:8080")
public class ToDoController {
    // Inject the ToDoService via constructor
    private final ToDoService tds;

    /**
     * GET endpoint to retrieve a list of ToDos based on search criteria.
     * This endpoint supports optional filtering by text, priority, and state,
     * and allows sorting by priority and due date. Pagination is also supported
     * with the mandatory 'pageNumber' parameter.
     *
     * @param text           Optional filter for the ToDo text (search term).
     * @param priority       Optional filter for ToDo priority ("Low", "Medium", "High").
     * @param state          Optional filter for ToDo state ("true" for done, "false" for undone).
     * @param sortByPriority Optional sorting by priority ("asc" or "desc").
     * @param sortByDueDate  Optional sorting by due date ("asc" or "desc").
     * @param pageNumber     Mandatory page number for pagination.
     * @return ResponseEntity containing a list of ToDos based on the search criteria.
     */
    @GetMapping
    public ResponseEntity<ListToDoDTO> getToDos(
            @RequestParam(value = "text", required = false) String text,
            @RequestParam(value = "priority", required = false) String priority,
            @RequestParam(value = "state", required = false) String state,
            @RequestParam(value = "sortByPriority", defaultValue = "") String sortByPriority,
            @RequestParam(value = "sortByDueDate", defaultValue = "") String sortByDueDate,
            @RequestParam(value = "pageNumber") int pageNumber) {

        // Construct the SearchDTO with the provided query parameters
        SearchDTO searchDTO = new SearchDTO(text, priority, state, sortByPriority, sortByDueDate, pageNumber);

        // Delegate the search operation to the service layer
        return tds.searchToDos(searchDTO);
    }

    /**
     * GET endpoint to retrieve metrics related to ToDos.
     * Provides insights like average time taken to complete ToDos, grouped by priority.
     *
     * @return ResponseEntity containing the ToDo metrics.
     */
    @GetMapping("/metrics")
    public ResponseEntity<MetricsDTO> getMetrics() {
        // Delegate the metrics calculation to the service layer
        return tds.getMetrics();
    }

    /**
     * POST endpoint to create a new ToDo.
     * Validates the incoming ToDoDTO and delegates the creation to the service layer.
     *
     * @param dto ToDoDTO containing the details of the ToDo to be created.
     * @return ResponseEntity indicating success or failure of the creation process.
     */
    @PostMapping
    public ResponseEntity<String> createToDo(@Valid @RequestBody ToDoDTO dto) {
        // Delegate ToDo creation to the service layer
        return tds.createToDo(dto);
    }

    /**
     * PUT endpoint to update an existing ToDo.
     * The ToDo is identified by its ID, and the provided ToDoDTO contains the updated details.
     *
     * @param id  The ID of the ToDo to be updated.
     * @param dto ToDoDTO containing the updated details of the ToDo.
     * @return ResponseEntity indicating success or failure of the update process.
     */
    @PutMapping("/{id}")
    public ResponseEntity<String> updateToDo(@PathVariable("id") Long id, @Valid @RequestBody ToDoDTO dto) {
        // Delegate the update operation to the service layer
        return tds.updateToDo(id, dto);
    }

    /**
     * DELETE endpoint to delete an existing ToDo.
     * The ToDo is identified by its ID.
     *
     * @param id The ID of the ToDo to be deleted.
     * @return ResponseEntity indicating success or failure of the deletion process.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteToDo(@PathVariable("id") Long id) {
        // Delegate the delete operation to the service layer
        return tds.deleteToDo(id);
    }

    /**
     * PUT endpoint to update the 'done' status of a ToDo.
     * Toggles the done status between true and false, identified by the ToDo's ID.
     *
     * @param id The ID of the ToDo whose status is to be updated.
     * @return ResponseEntity indicating success or failure of the status update.
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateToDoStatus(@PathVariable("id") Long id) {
        // Delegate the status update to the service layer
        return tds.updateDone(id);
    }
}
