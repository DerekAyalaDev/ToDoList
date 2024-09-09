package com.encora.todolist.service;

import com.encora.todolist.dto.ToDoDTO;
import com.encora.todolist.exception.ToDoNotFoundException;
import com.encora.todolist.model.ToDo;
import com.encora.todolist.repository.ToDoRepository;
import com.encora.todolist.testdata.TestDataFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ToDoServiceTest {
    @Mock
    private ToDoRepository toDoRepository;
    @InjectMocks
    private ToDoService toDoService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateToDo_Success() {
        ToDoDTO toDoDTO = new ToDoDTO();
        toDoDTO.setText("Sample Task");
        toDoDTO.setPriority("High");
        toDoDTO.setDueDate(TestDataFactory.createToDo(1L, "Sample Task", "High", null, false).getDueDate());

        ResponseEntity<String> response = toDoService.createToDo(toDoDTO);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("To Do created successfully", response.getBody());
        verify(toDoRepository, times(1)).save(any(ToDo.class));
    }

    @Test
    public void testFindById_Success() {
        ToDo toDo = TestDataFactory.createToDo(1L, "Sample Task", "High", null, false);
        when(toDoRepository.findById(1L)).thenReturn(Optional.of(toDo));

        ToDo foundToDo = toDoService.findById(1L);

        assertNotNull(foundToDo);
        assertEquals("Sample Task", foundToDo.getText());
        verify(toDoRepository, times(1)).findById(1L);
    }

    @Test
    public void testFindById_NotFound() {
        when(toDoRepository.findById(1L)).thenReturn(Optional.empty());

        ToDoNotFoundException exception = assertThrows(ToDoNotFoundException.class, () -> toDoService.findById(1L));

        assertEquals("To-do with ID 1 not found", exception.getMessage());
        verify(toDoRepository, times(1)).findById(1L);
    }

    @Test
    public void testUpdateDone_ToggleStatusDone() {
        ToDo toDo = TestDataFactory.createToDo(1L, "Sample Task", "High", null, false);
        when(toDoRepository.findById(1L)).thenReturn(Optional.of(toDo));

        ResponseEntity<String> response = toDoService.updateDone(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(toDo.getDone());
        assertNotNull(toDo.getDoneDate());
        verify(toDoRepository, times(1)).save(toDo);
    }

    @Test
    public void testUpdateDone_ToggleStatusUnDone() {
        ToDo toDo = TestDataFactory.createToDo(1L, "Sample Task", "High", null, true);
        toDo.setDoneDate(LocalDateTime.now());
        when(toDoRepository.findById(1L)).thenReturn(Optional.of(toDo));

        ResponseEntity<String> response = toDoService.updateDone(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertFalse(toDo.getDone());
        assertNull(toDo.getDoneDate());
        verify(toDoRepository, times(1)).save(toDo);
    }

    @Test
    public void testDeleteToDo_Success() {
        ToDo toDo = TestDataFactory.createToDo(1L, "Sample Task", "High", null, false);
        when(toDoRepository.findById(1L)).thenReturn(Optional.of(toDo));

        ResponseEntity<String> response = toDoService.deleteToDo(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(toDoRepository, times(1)).delete(toDo);
    }

    @Test
    public void testFindAllToDos() {
        List<ToDo> toDoList = TestDataFactory.createToDoList(50);
        when(toDoRepository.findByCriteria(any())).thenReturn(toDoList);

        List<ToDo> result = toDoService.searchToDos(null).getBody();

        assertNotNull(result);
        assertEquals(50, result.size());
        verify(toDoRepository, times(1)).findByCriteria(any());
    }
}
