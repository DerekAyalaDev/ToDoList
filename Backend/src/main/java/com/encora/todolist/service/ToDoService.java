package com.encora.todolist.service;

import com.encora.todolist.dto.SearchDTO;
import com.encora.todolist.dto.ToDoDTO;
import com.encora.todolist.model.ToDo;
import com.encora.todolist.repository.ToDoRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class ToDoService {
    private final ToDoRepository toDoRepository;
    
    public void createToDo(ToDoDTO dto) {
        ToDo td = new ToDo();
        HandleText(td, dto.getText());
        HandleDueDate(td, dto.getDueDate());
        td.setDone(false);
        td.setCreationDate(LocalDateTime.now());
        td.setPriority(dto.getPriority());
        toDoRepository.save(td);
    }
    
    public void deleteToDo(Long id) {
        ToDo td = findById(id);
        toDoRepository.delete(td);
    }
    
    public void updateDone(Long id) {
        ToDo td = findById(id);
        if (td.getDone()) {
            td.setDone(false);
            td.setDoneDate(null);
        } else {
            td.setDone(true);
            td.setDoneDate(LocalDateTime.now());
        }
        toDoRepository.save(td);
    }
    
    public void updateToDo(Long id, ToDoDTO dto) {
        ToDo td = findById(id);
        HandleText(td, dto.getText());
        HandleDueDate(td, dto.getDueDate());
        td.setPriority(dto.getPriority());
        toDoRepository.save(td);
    }
    
    public List<ToDo> searchToDos(SearchDTO dto) {
        return toDoRepository.findAll(Specification
                .where(textIsLike(dto.getText())
                .and(priorityIs(dto.getPriority())
                .and(DoneIs(dto.getState())))));
    }
    
    private ToDo findById(Long id) {
        Optional<ToDo> optional = toDoRepository.findById(id);
        if (optional.isEmpty()) {
            
        }
        return optional.get();
    }
    
    private Specification<ToDo> textIsLike(String text) {
        return (root, query, criteriaBuilder) -> {
            if (text == null || text.isEmpty()) {
                return criteriaBuilder.conjunction();
            } else {
                return criteriaBuilder.like(criteriaBuilder.lower(root.get("text")), "%" + text.toLowerCase() + "%");
            }
        };
    }
    
    private Specification<ToDo> priorityIs(String priority) {
        return (root, query, criteriaBuilder) -> {
            if ("all".equalsIgnoreCase(priority)) {
                return criteriaBuilder.conjunction();
            } else {
                return criteriaBuilder.equal(root.get("priority"), priority);
            }
        };
    }
    
    private Specification<ToDo> doneIs(String doneStatus) {
        return (root, query, criteriaBuilder) -> {
            if ("all".equalsIgnoreCase(doneStatus)) {
                return criteriaBuilder.conjunction();
            } else if ("done".equalsIgnoreCase(doneStatus)) {
                return criteriaBuilder.isTrue(root.get("done"));
            } else {
                return criteriaBuilder.isFalse(root.get("done"));
            }
        };
    }
    
    private void handleText(ToDo td, String text) {
        if (text == null || text.isBlank()) {
            td.setText(text);
        }
    }
    
    private void handleDueDate(ToDo td, LocalDate dueDate) {
        if(dueDate.isAfter(td.getDueDate())){           
            td.setDueDate(dueDate);
        }
    }
}
