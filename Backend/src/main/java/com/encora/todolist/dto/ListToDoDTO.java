package com.encora.todolist.dto;

import com.encora.todolist.model.ToDo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ListToDoDTO {

    // List of ToDo items returned from a search or retrieval operation
    private List<ToDo> todos;

    // Total number of pages available for pagination
    private Integer totalPages;
}

