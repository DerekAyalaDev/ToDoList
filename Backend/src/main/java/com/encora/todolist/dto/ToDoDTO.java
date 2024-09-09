package com.encora.todolist.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

@Getter
@Setter
@NoArgsConstructor
public class ToDoDTO {
    @NotBlank(message = "Name of the task is required")
    @Size(max = 120, message = "The max size for the name is 120 character")
    private String text;
    @FutureOrPresent(message = "Due date cannot be in the past")
    private LocalDate dueDate;
    private String priority;
}
