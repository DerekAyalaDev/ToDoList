package com.encora.todolist.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ToDo {

    // Unique identifier for each ToDo item
    private Long id;

    // Description or title of the ToDo task (required, max length 120 characters)
    private String text;

    // Optional due date for the task
    private LocalDate dueDate;

    // Flag indicating whether the task is done (true for done, false for undone)
    private Boolean done;

    // Date and time when the task was marked as done (optional)
    private LocalDateTime doneDate;

    // Priority level for the task ("Low", "Medium", or "High")
    private String priority;

    // Timestamp indicating when the task was created
    private LocalDateTime creationDate;

    @Override
    public String toString() {
        return "ToDo{ " +
                "id=" + id +
                ", text='" + text + '\'' +
                ", dueDate=" + dueDate +
                ", done=" + done +
                ", doneDate=" + doneDate +
                ", priority='" + priority + '\'' +
                ", creationDate=" + creationDate +
                " }";
    }
}

