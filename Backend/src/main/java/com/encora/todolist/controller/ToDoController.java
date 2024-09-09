package com.encora.todolist.controller;

import com.encora.todolist.dto.SearchDTO;
import com.encora.todolist.dto.ToDoDTO;
import com.encora.todolist.model.ToDo;
import com.encora.todolist.service.ToDoService;
import java.util.List;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ToDoController {
    private final ToDoService tds;
    
    @GetMapping("/todos")
    public ResponseEntity<List<ToDo>> getToDos(@Valid @RequestBody SearchDTO dto) {
        return tds.searchToDos(dto);
    }
    
    @PostMapping("/todos")
    public ResponseEntity<String> createToDo(@Valid @RequestBody ToDoDTO dto) {
        return tds.createToDo(dto);
    }
    
    @PutMapping("todos/{id}")
    public ResponseEntity<String> updateToDo(@PathVariable("id") Long id, @Valid @RequestBody ToDoDTO dto) {
        return tds.updateToDo(id, dto);
    }

    @DeleteMapping("todos/{id}")
    public ResponseEntity<String> deleteToDo(@PathVariable("id") Long id) {
        return tds.deleteToDo(id);
    }

    @PutMapping("todos/{id}/status")
    public ResponseEntity<String> updateToDoStatus(@PathVariable("id") Long id) {
        return tds.updateDone(id);
    }
}
