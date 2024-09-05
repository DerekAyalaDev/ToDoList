package com.encora.todolist.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SearchDTO {
    private String text;
    private String priority;
    private String state;
}
