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
    private List<ToDo> todos;
    private Integer totalPages;
}
