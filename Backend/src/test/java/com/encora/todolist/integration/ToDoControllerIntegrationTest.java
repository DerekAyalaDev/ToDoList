package com.encora.todolist.integration;

import com.encora.todolist.BackendApplication;
import com.encora.todolist.dto.SearchDTO;
import com.encora.todolist.dto.ToDoDTO;
import com.encora.todolist.model.ToDo;
import com.encora.todolist.repository.ToDoRepository;
import com.encora.todolist.testdata.TestDataFactory;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(classes = BackendApplication.class)
@AutoConfigureMockMvc
public class ToDoControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ToDoRepository toDoRepository;

    @BeforeEach
    void setUp() {
        toDoRepository.deleteAll();
        List<ToDo> toDoList = TestDataFactory.createToDoList(10);
        toDoRepository.saveAll(toDoList);
    }

    @Test
    public void testGetAllToDos() throws Exception {
        mockMvc.perform(get("/api/todos")
                        .param("pageNumber", "0")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.todos.size()", is(10)))
                .andExpect(jsonPath("$.todos[0].text", containsString("Task")))
                .andExpect(jsonPath("$.todos[0].priority", anyOf(is("High"), is("Medium"), is("Low"))))
                .andExpect(jsonPath("$.totalPages", is(1)));
    }

    @Test
    public void testCreateToDo() throws Exception {
        ToDoDTO newToDo = new ToDoDTO();
        newToDo.setText("New Task");
        newToDo.setPriority("Low");
        newToDo.setDueDate(null);

        mockMvc.perform(post("/api/todos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newToDo)))
                .andExpect(status().isCreated())
                .andExpect(content().string("To Do created successfully"));
    }

    @Test
    public void testUpdateToDo() throws Exception {
        ToDo existingToDo = toDoRepository.findAll().get(0);

        ToDoDTO updatedToDo = new ToDoDTO();
        updatedToDo.setText("Updated Task");
        updatedToDo.setPriority("High");
        updatedToDo.setDueDate(LocalDate.now().plusDays(5));

        mockMvc.perform(put("/api/todos/" + existingToDo.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedToDo)))
                .andExpect(status().isOk())
                .andExpect(content().string("To Do updated successfully"));

        mockMvc.perform(get("/api/todos")
                        .param("pageNumber", "0")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.todos[0].text", is("Updated Task")));
    }

    @Test
    public void testUpdateToDoStatus() throws Exception {
        ToDo existingToDo = toDoRepository.findAll().get(0);
        boolean actual = existingToDo.getDone();
        mockMvc.perform(put("/api/todos/" + existingToDo.getId() + "/status")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("Status updated"));

        SearchDTO dto = TestDataFactory.createSearchDTO(null,null,null);

        mockMvc.perform(get("/api/todos")
                        .param("pageNumber", "0")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.todos[0].done").value(!actual));
    }

    @Test
    public void testDeleteToDo() throws Exception {
        ToDo existingToDo = toDoRepository.findAll().get(0);

        mockMvc.perform(delete("/api/todos/" + existingToDo.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/todos")
                        .param("pageNumber", "0")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.todos.size()", is(9)));
    }

    @Test
    public void testGetMetrics() throws Exception {
        toDoRepository.deleteAll();
        List<ToDo> listPredefinedTimes = TestDataFactory.createToDosWithPredefinedTimes();
        toDoRepository.saveAll(listPredefinedTimes);

        mockMvc.perform(get("/api/todos/metrics")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.lowTime",is("01:30:00")))
                .andExpect(jsonPath("$.mediumTime",is("03:30:00")))
                .andExpect(jsonPath("$.highTime",is("04:30:00")))
                .andExpect(jsonPath("$.averageTime",is("03:10:00")));

    }
}
