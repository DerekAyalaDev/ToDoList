package com.encora.todolist.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchDTO {

    // Search term to filter ToDos based on text content (optional)
    private String text;

    // Filter to find ToDos based on priority ("Low", "Medium", "High") (optional)
    private String priority;

    // Filter based on the state of the ToDo ("true" for done, "false" for undone) (optional)
    private String state;

    // Sorting preference for ToDos by priority ("asc" or "desc")
    private String sortByPriority = "";

    // Sorting preference for ToDos by due date ("asc" or "desc")
    private String sortByDueDate = "";

    // Page number for pagination, defaults to 0
    private int pageNumber = 0;
}

