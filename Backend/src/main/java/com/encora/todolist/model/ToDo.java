package com.encora.todolist.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ToDo {
    private Long id;
    private String text;
    private LocalDate dueDate;
    private Boolean done;
    private LocalDateTime doneDate;
    private String priority;
    private LocalDateTime creationDate;

    @Override
    public String toString() {
        return "ToDo{ " + "id=" + id + ", text=" + text + ", dueDate=" + dueDate + ", done=" + done + ", doneDate=" + doneDate + ", priority=" + priority + ", creationDate=" + creationDate + " }";
    }
}
