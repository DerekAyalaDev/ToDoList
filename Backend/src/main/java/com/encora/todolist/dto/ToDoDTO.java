package com.encora.todolist.dto;

import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ToDoDTO {
    private String text;
    private LocalDate dueDate;
    private Boolean done;
    private String priority;
}
