package com.encora.todolist.testdata;

import com.encora.todolist.dto.SearchDTO;
import com.encora.todolist.model.ToDo;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class TestDataFactory {
    public static List<ToDo> createToDoList(int size) {
        List<ToDo> toDoList = new ArrayList<>();

        for (int i = 1; i <= size; i++) {
            ToDo toDo = new ToDo();
            toDo.setId((long) i);
            toDo.setText("Task " + i);
            toDo.setPriority(i % 3 == 0 ? "High" : i % 2 == 0 ? "Medium" : "Low");
            toDo.setCreationDate(LocalDateTime.now().minusDays(i));
            toDo.setDueDate(LocalDate.now().plusDays(i));
            toDo.setDone(i % 2 == 0);
            if (toDo.getDone()) {
                toDo.setDoneDate(LocalDateTime.now().minusDays(i / 2));
            }
            toDoList.add(toDo);
        }

        return toDoList;
    }

    public static ToDo createToDo(Long id, String text, String priority, LocalDate dueDate, boolean done) {
        ToDo toDo = new ToDo();
        toDo.setId(id);
        toDo.setText(text);
        toDo.setPriority(priority);
        toDo.setCreationDate(LocalDateTime.now());
        toDo.setDueDate(dueDate);
        toDo.setDone(done);
        return toDo;
    }

    public static SearchDTO createSearchDTO(String text, String priority, String done) {
        SearchDTO searchDTO = new SearchDTO();
        searchDTO.setText(text);
        searchDTO.setPriority(priority);
        searchDTO.setState(done);
        return searchDTO;
    }
}
