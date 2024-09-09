package com.encora.todolist.repository;

import com.encora.todolist.dto.SearchDTO;
import com.encora.todolist.model.ToDo;
import org.springframework.stereotype.Repository;
import java.util.*;
import java.util.stream.Collectors;

@Repository
public class InMemoryToDoRepository implements ToDoRepository{
    private final Map<Long, ToDo> toDoStore = new HashMap<>();
    private Long currentId = 1L;

    @Override
    public List<ToDo> findAll() {
        return new ArrayList<>(toDoStore.values());
    }

    @Override
    public Optional<ToDo> findById(Long id) {
        return Optional.ofNullable(toDoStore.get(id));
    }

    @Override
    public void save(ToDo toDo) {
        if (toDo.getId() == null) {
            toDo.setId(currentId++);
        }
        toDoStore.put(toDo.getId(), toDo);
    }

    @Override
    public void delete(ToDo toDo) {
        toDoStore.remove(toDo.getId());
    }

    @Override
    public List<ToDo> findByCriteria(SearchDTO searchDTO) {
        if (searchDTO == null) {
            return new ArrayList<>(toDoStore.values());
        }
        return toDoStore.values().stream()
                .filter(todo -> searchDTO.getText() == null || searchDTO.getText().isBlank() || todo.getText().contains(searchDTO.getText()))
                .filter(todo -> searchDTO.getPriority() == null || searchDTO.getPriority().isBlank() || todo.getPriority().equalsIgnoreCase(searchDTO.getPriority()))
                .filter(todo -> searchDTO.getState() == null || searchDTO.getState().isBlank() || todo.getDone().toString().equalsIgnoreCase(searchDTO.getState()))
                .collect(Collectors.toList());
    }

    @Override
    public void saveAll(List<ToDo> toDoList) {
        for (ToDo toDo : toDoList) {
            save(toDo);
        }
    }

    @Override
    public void deleteAll() {
        toDoStore.clear();
    }
}
