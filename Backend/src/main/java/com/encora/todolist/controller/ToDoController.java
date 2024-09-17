package com.encora.todolist.controller;

import com.encora.todolist.dto.MetricsDTO;
import com.encora.todolist.dto.SearchDTO;
import com.encora.todolist.dto.ToDoDTO;
import com.encora.todolist.model.ToDo;
import com.encora.todolist.service.ToDoService;
import java.util.List;
import java.util.Map;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:8080")
public class ToDoController {
    private final ToDoService tds;

    @GetMapping
    public ResponseEntity<List<ToDo>> getToDos(
            @RequestParam(value = "text", required = false) String text,
            @RequestParam(value = "priority", required = false) String priority,
            @RequestParam(value = "state", required = false) String state,
            @RequestParam(value = "sortByPriority", defaultValue = "") String sortByPriority,
            @RequestParam(value = "sortByDueDate", defaultValue = "") String sortByDueDate,
            @RequestParam(value = "pageNumber") int pageNumber) {
        SearchDTO searchDTO = new SearchDTO(text, priority, state, sortByPriority, sortByDueDate, pageNumber);

        return tds.searchToDos(searchDTO);
    }

    @GetMapping("/metrics")
    public ResponseEntity<MetricsDTO> getMetrics() {
        return tds.getMetrics();
    }

    @PostMapping
    public ResponseEntity<String> createToDo(@Valid @RequestBody ToDoDTO dto) {
        return tds.createToDo(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateToDo(@PathVariable("id") Long id, @Valid @RequestBody ToDoDTO dto) {
        return tds.updateToDo(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteToDo(@PathVariable("id") Long id) {
        return tds.deleteToDo(id);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateToDoStatus(@PathVariable("id") Long id) {
        return tds.updateDone(id);
    }

    @GetMapping("/pages")
    public ResponseEntity<Map<String, Integer>> getTotalPages(@RequestBody SearchDTO searchDTO) {
        return tds.getTotalPages(searchDTO);
    }
}
