package com.encora.todolist.repository;

import com.encora.todolist.model.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToDoRepository extends JpaRepository<ToDo, Long>{
}
