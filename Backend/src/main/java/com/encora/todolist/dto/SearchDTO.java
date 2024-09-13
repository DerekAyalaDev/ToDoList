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
    private String text;
    private String priority;
    private String state;

    private String sortByPriority = "";
    private String sortByDueDate = "";

    private int pageNumber = 0;
}
