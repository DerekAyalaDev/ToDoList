package com.encora.todolist.exception;

public class ToDoNotFoundException extends RuntimeException{
    public ToDoNotFoundException(Long id) {
        super("To-do with ID " + id + " not found");
    }
}
