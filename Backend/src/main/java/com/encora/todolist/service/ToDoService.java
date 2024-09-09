package com.encora.todolist.service;

import com.encora.todolist.dto.SearchDTO;
import com.encora.todolist.dto.ToDoDTO;
import com.encora.todolist.model.ToDo;
import com.encora.todolist.repository.ToDoRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
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
        handleText(td, dto.getText());
        handleDueDate(td, dto.getDueDate());
        td.setDone(false);
        td.setCreationDate(LocalDateTime.now());
        td.setPriority(dto.getPriority());
        toDoRepository.save(td);
        return new ResponseEntity<>("To Do created succesfully", HttpStatus.CREATED);
    }
    
    public ResponseEntity<String> deleteToDo(Long id) {
        ToDo td = findById(id);
        toDoRepository.delete(td);
        return new ResponseEntity<>("To Do deleted succesfully", HttpStatus.NO_CONTENT);
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
        handleText(td, dto.getText());
        handleDueDate(td, dto.getDueDate());
        td.setPriority(dto.getPriority());
        toDoRepository.save(td);
        return new ResponseEntity<>("To Do updated succesfully", HttpStatus.OK);
    }

    public ResponseEntity<List<ToDo>> searchToDos(SearchDTO dto) {
        Specification<ToDo> specification = Specification.where(null);
        if (dto == null) {
            specification = specification.and(textIsLike(dto.getText()).and(priorityIs(dto.getPriority()).and(doneIs(dto.getState()))));
        }
        List<ToDo> tds = toDoRepository.findAll(specification);
        return new ResponseEntity<>(tds, HttpStatus.OK);
    }
        
    private ToDo findById(Long id) {
        Optional<ToDo> optional = toDoRepository.findById(id);
        if (optional.isEmpty()) {
            
        }
        return optional.get();
    }
    
    private void handleText(ToDo td, String text) {
        if (text != null || !text.isBlank()) {
            td.setText(text);
        }
    }
    
    private void handleDueDate(ToDo td, LocalDate dueDate) {
        if(dueDate.isAfter(td.getDueDate())){           
            td.setDueDate(dueDate);
        }
    }
}
