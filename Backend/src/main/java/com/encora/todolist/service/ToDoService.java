package com.encora.todolist.service;

import com.encora.todolist.dto.MetricsDTO;
import com.encora.todolist.dto.SearchDTO;
import com.encora.todolist.dto.ToDoDTO;
import com.encora.todolist.exception.ToDoNotFoundException;
import com.encora.todolist.model.ToDo;
import com.encora.todolist.repository.ToDoRepository;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ToDoService {
    private final ToDoRepository toDoRepository;
    private final Integer pageSize = 10;
    
    public ResponseEntity<String> createToDo(ToDoDTO dto) {
        ToDo td = new ToDo();
        td.setText(dto.getText());
        td.setDueDate(dto.getDueDate());
        td.setDone(false);
        td.setCreationDate(LocalDateTime.now());
        td.setPriority(dto.getPriority());
        toDoRepository.save(td);
        return new ResponseEntity<>("To Do created successfully", HttpStatus.CREATED);
    }
    
    public ResponseEntity<String> deleteToDo(Long id) {
        ToDo td = findById(id);
        toDoRepository.delete(td);
        return new ResponseEntity<>("To Do deleted successfully", HttpStatus.NO_CONTENT);
    }
    
    public ResponseEntity<String> updateDone(Long id) {
        ToDo td = findById(id);
        if (td.getDone()) {
            td.setDone(false);
            td.setDoneDate(null);
        } else {
            td.setDone(true);
            td.setDoneDate(LocalDateTime.now());
        }
        toDoRepository.save(td);
        return new ResponseEntity<>("Status updated", HttpStatus.OK);
    }
    
    public ResponseEntity<String> updateToDo(Long id, ToDoDTO dto) {
        ToDo td = findById(id);
        td.setText(dto.getText());
        td.setDueDate(dto.getDueDate());
        td.setPriority(dto.getPriority());
        toDoRepository.save(td);
        return new ResponseEntity<>("To Do updated successfully", HttpStatus.OK);
    }

    public ResponseEntity<Map<String, Integer>> getTotalPages(SearchDTO dto) {
        int pageSize = 10;
        List<ToDo> tds = toDoRepository.findByCriteria(dto);
        int totalPages = (int) Math.ceil((double) tds.size() / pageSize);

        Map<String, Integer> response = new HashMap<>();
        response.put("totalPages", totalPages);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<List<ToDo>> searchToDos(SearchDTO dto) {
        List<ToDo> tds = toDoRepository.findByCriteria(dto);
        return new ResponseEntity<>(sortToDos(dto, tds), HttpStatus.OK);
    }

    public List<ToDo> sortToDos(SearchDTO dto, List<ToDo> tds) {
        // Ordenar tanto por prioridad como por dueDate
        if (!dto.getSortByPriority().isEmpty() && !dto.getSortByDueDate().isEmpty()) {
            tds = tds.stream()
                    .sorted((td1, td2) -> {
                        // Comparar por prioridad
                        Integer priority1 = PRIORITY_MAP.get(td1.getPriority());
                        Integer priority2 = PRIORITY_MAP.get(td2.getPriority());
                        int result = dto.getSortByPriority().equalsIgnoreCase("asc") ?
                                priority1.compareTo(priority2) : priority2.compareTo(priority1);

                        // Si las prioridades son iguales, ordenar por dueDate
                        if (result == 0) {
                            result = compareDueDates(td1, td2, dto.getSortByDueDate());
                        }
                        return result;
                    })
                    .collect(Collectors.toList());
        }
        // Ordenar solo por prioridad
        else if (!dto.getSortByPriority().isEmpty()) {
            tds = tds.stream()
                    .sorted((td1, td2) -> {
                        Integer priority1 = PRIORITY_MAP.get(td1.getPriority());
                        Integer priority2 = PRIORITY_MAP.get(td2.getPriority());
                        return dto.getSortByPriority().equalsIgnoreCase("asc") ?
                                priority1.compareTo(priority2) : priority2.compareTo(priority1);
                    })
                    .collect(Collectors.toList());
        }
        // Ordenar solo por dueDate
        else if (!dto.getSortByDueDate().isEmpty()) {
            tds = tds.stream()
                    .sorted((td1, td2) -> compareDueDates(td1, td2, dto.getSortByDueDate()))
                    .collect(Collectors.toList());
        }

        // Paginación
        int start = dto.getPageNumber() * pageSize;
        int end = Math.min(start + pageSize, tds.size());
        if (start > tds.size()) {
            return new ArrayList<>();
        }

        return tds.subList(start, end);
    }

    // Método auxiliar para comparar dueDates
    private int compareDueDates(ToDo td1, ToDo td2, String sortOrder) {
        LocalDate dueDate1 = td1.getDueDate();
        LocalDate dueDate2 = td2.getDueDate();

        // Ordenar los nulls dependiendo del orden especificado
        if (dueDate1 == null && dueDate2 == null) {
            return 0; // Ambos son null, son iguales
        } else if (dueDate1 == null) {
            return sortOrder.equalsIgnoreCase("asc") ? 1 : -1; // null va al final si es ascendente
        } else if (dueDate2 == null) {
            return sortOrder.equalsIgnoreCase("asc") ? -1 : 1; // null va al principio si es descendente
        }

        // Comparar normalmente si ninguno es null
        return sortOrder.equalsIgnoreCase("asc") ?
                dueDate1.compareTo(dueDate2) : dueDate2.compareTo(dueDate1);
    }

    public ResponseEntity<MetricsDTO> getMetrics() {
        MetricsDTO dto = new MetricsDTO();
        List<ToDo> tds = toDoRepository.findByCriteria(new SearchDTO(null, "", "true", null, null, 0));
        dto.setAverageTime(averageTime(tds));
        dto.setLowTime(averageTime(tds.stream().filter(td -> "Low".equals(td.getPriority())).toList()));
        dto.setMediumTime(averageTime(tds.stream().filter(td -> "Medium".equals(td.getPriority())).toList()));
        dto.setHighTime(averageTime(tds.stream().filter(td -> "High".equals(td.getPriority())).toList()));
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    public ToDo findById(Long id) {
        return toDoRepository.findById(id)
                .orElseThrow(() -> new ToDoNotFoundException(id));
    }
    
    private String averageTime(List<ToDo> tds) {
        if (tds == null || tds.isEmpty()) {
            return "00:00:00";
        }
        long sumSeconds = 0L;
        int size = tds.size();
        for(ToDo td: tds) {
            Duration duration = Duration.between(td.getCreationDate(), td.getDoneDate());
            sumSeconds += duration.toSeconds();
        }
        long averageSeconds = sumSeconds / size;
        long hours = averageSeconds / 3600;
        long minutes = (averageSeconds % 3600) / 60;
        long seconds = averageSeconds % 60;
        return String.format("%02d:%02d:%02d", hours, minutes, seconds);
    }

    private static final Map<String, Integer> PRIORITY_MAP = Map.of(
            "Low", 1,
            "Medium", 2,
            "High", 3
    );
}
