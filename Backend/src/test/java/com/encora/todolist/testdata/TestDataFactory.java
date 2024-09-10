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

    public static List<ToDo> createToDosWithPredefinedTimes() {
        List<ToDo> toDoList = new ArrayList<>();

        ToDo low1 = new ToDo();
        low1.setCreationDate(LocalDateTime.of(2024, 9, 8, 10, 0));
        low1.setDoneDate(LocalDateTime.of(2024, 9, 8, 12, 0));
        low1.setPriority("Low");
        low1.setDone(true);
        toDoList.add(low1);

        ToDo low2 = new ToDo();
        low2.setCreationDate(LocalDateTime.of(2024, 9, 9, 10, 0));
        low2.setDoneDate(LocalDateTime.of(2024, 9, 9, 11, 0));
        low2.setPriority("Low");
        low2.setDone(true);
        toDoList.add(low2);

        ToDo medium1 = new ToDo();
        medium1.setCreationDate(LocalDateTime.of(2024, 9, 8, 10, 0));
        medium1.setDoneDate(LocalDateTime.of(2024, 9, 8, 14, 0));
        medium1.setPriority("Medium");
        medium1.setDone(true);
        toDoList.add(medium1);

        ToDo medium2 = new ToDo();
        medium2.setCreationDate(LocalDateTime.of(2024, 9, 9, 10, 0));
        medium2.setDoneDate(LocalDateTime.of(2024, 9, 9, 13, 0));
        medium2.setPriority("Medium");
        medium2.setDone(true);
        toDoList.add(medium2);

        ToDo high1 = new ToDo();
        high1.setCreationDate(LocalDateTime.of(2024, 9, 8, 10, 0));
        high1.setDoneDate(LocalDateTime.of(2024, 9, 8, 15, 0));
        high1.setPriority("High");
        high1.setDone(true);
        toDoList.add(high1);

        ToDo high2 = new ToDo();
        high2.setCreationDate(LocalDateTime.of(2024, 9, 9, 10, 0));
        high2.setDoneDate(LocalDateTime.of(2024, 9, 9, 14, 0));
        high2.setPriority("High");
        high2.setDone(true);
        toDoList.add(high2);

        return toDoList;
    }
}
