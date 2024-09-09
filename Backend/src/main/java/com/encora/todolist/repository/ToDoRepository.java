package com.encora.todolist.repository;

import com.encora.todolist.dto.SearchDTO;
import com.encora.todolist.model.ToDo;

import java.util.List;
import java.util.Optional;

public interface ToDoRepository {
    List<ToDo> findAll();
    Optional<ToDo> findById(Long id);
    void save(ToDo toDo);
    void delete(ToDo toDo);
    List<ToDo> findByCriteria(SearchDTO searchDTO);
    void deleteAll();
    void saveAll(List<ToDo> toDoList);
}
