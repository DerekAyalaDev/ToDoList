package com.encora.todolist.controller;

import com.encora.todolist.service.ToDoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ToDoController {
    private final ToDoService tds;
}
