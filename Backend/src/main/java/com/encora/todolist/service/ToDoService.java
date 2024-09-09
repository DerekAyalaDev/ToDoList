package com.encora.todolist.service;

import com.encora.todolist.dto.SearchDTO;
import com.encora.todolist.dto.ToDoDTO;
import com.encora.todolist.exception.ToDoNotFoundException;
import com.encora.todolist.model.ToDo;
import com.encora.todolist.repository.ToDoRepository;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ToDoService {
    private final ToDoRepository toDoRepository;
    
    public ResponseEntity<String> createToDo(ToDoDTO dto) {
        ToDo td = new ToDo();
        td.setText(dto.getText());
        td.setDueDate(dto.getDueDate());
        td.setDone(false);
        td.setCreationDate(LocalDateTime.now());
        td.setPriority(dto.getPriority());
        toDoRepository.save(td);
        return new ResponseEntity<>("To Do created successfully", HttpStatus.CREATED);
    }
    
    public ResponseEntity<String> deleteToDo(Long id) {
        ToDo td = findById(id);
        toDoRepository.delete(td);
        return new ResponseEntity<>("To Do deleted successfully", HttpStatus.NO_CONTENT);
    }
    
    public ResponseEntity<String> updateDone(Long id) {
        ToDo td = findById(id);
        if (td.getDone()) {
            td.setDone(false);
            td.setDoneDate(null);
        } else {
            td.setDone(true);
            td.setDoneDate(LocalDateTime.now());
        }
        toDoRepository.save(td);
        return new ResponseEntity<>("Status updated", HttpStatus.OK);
    }
    
    public ResponseEntity<String> updateToDo(Long id, ToDoDTO dto) {
        ToDo td = findById(id);
        td.setText(dto.getText());
        td.setDueDate(dto.getDueDate());
        td.setPriority(dto.getPriority());
        toDoRepository.save(td);
        return new ResponseEntity<>("To Do updated successfully", HttpStatus.OK);
    }

    public ResponseEntity<List<ToDo>> searchToDos(SearchDTO dto) {
        List<ToDo> tds = toDoRepository.findByCriteria(dto);
        return new ResponseEntity<>(tds, HttpStatus.OK);
    }

    public ToDo findById(Long id) {
        return toDoRepository.findById(id)
                .orElseThrow(() -> new ToDoNotFoundException(id));
    }
}
