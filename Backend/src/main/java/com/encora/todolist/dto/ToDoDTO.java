package com.encora.todolist.dto;

import java.util.Date;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ToDoDTO {
    private String text;
    private Date dueDate;
    private Boolean done;
    private String priority;
}
