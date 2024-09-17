package com.encora.todolist.service;

import com.encora.todolist.dto.ListToDoDTO;
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

    // Injected repository to manage ToDo persistence
    private final ToDoRepository toDoRepository;

    // Fixed page size for pagination
    private final Integer pageSize = 10;

    /**
     * Creates a new ToDo item with the provided details.
     * Initializes the ToDo as not done and sets the creation date to the current time.
     *
     * @param dto The data transfer object containing the ToDo details.
     * @return ResponseEntity with a success message and HTTP status CREATED.
     */
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

    /**
     * Deletes a ToDo item based on its ID.
     *
     * @param id The ID of the ToDo item to delete.
     * @return ResponseEntity with a success message and HTTP status NO_CONTENT.
     */
    public ResponseEntity<String> deleteToDo(Long id) {
        ToDo td = findById(id);
        toDoRepository.delete(td);
        return new ResponseEntity<>("To Do deleted successfully", HttpStatus.NO_CONTENT);
    }

    /**
     * Updates the 'done' status of a ToDo item.
     * Toggles the status and updates the done date if marked as done.
     *
     * @param id The ID of the ToDo item to update.
     * @return ResponseEntity with a success message and HTTP status OK.
     */
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

    /**
     * Updates a ToDo item with new details.
     *
     * @param id  The ID of the ToDo item to update.
     * @param dto The updated details of the ToDo item.
     * @return ResponseEntity with a success message and HTTP status OK.
     */
    public ResponseEntity<String> updateToDo(Long id, ToDoDTO dto) {
        ToDo td = findById(id);
        td.setText(dto.getText());
        td.setDueDate(dto.getDueDate());
        td.setPriority(dto.getPriority());
        toDoRepository.save(td);
        return new ResponseEntity<>("To Do updated successfully", HttpStatus.OK);
    }

    /**
     * Searches for ToDo items based on the criteria provided in SearchDTO.
     * Results are paginated, sorted by priority and/or due date, if requested.
     *
     * @param dto The search criteria provided in SearchDTO.
     * @return ResponseEntity containing the list of ToDos and the total number of pages.
     */
    public ResponseEntity<ListToDoDTO> searchToDos(SearchDTO dto) {
        List<ToDo> tds = toDoRepository.findByCriteria(dto);
        int totalPages = tds.isEmpty() ? 1 : (int) Math.ceil((double) tds.size() / pageSize);
        tds = sortToDos(dto, tds);
        return new ResponseEntity<>(new ListToDoDTO(tds, totalPages), HttpStatus.OK);
    }

    /**
     * Sorts a list of ToDo items based on priority and due date.
     * Sorting by both fields is supported, with secondary sorting applied if necessary.
     *
     * @param dto The search criteria with sorting preferences.
     * @param tds The list of ToDo items to be sorted.
     * @return A paginated and sorted list of ToDo items.
     */
    public List<ToDo> sortToDos(SearchDTO dto, List<ToDo> tds) {
        if (!dto.getSortByPriority().isEmpty() && !dto.getSortByDueDate().isEmpty()) {
            tds = tds.stream()
                    .sorted((td1, td2) -> {
                        Integer priority1 = PRIORITY_MAP.get(td1.getPriority());
                        Integer priority2 = PRIORITY_MAP.get(td2.getPriority());
                        int result = dto.getSortByPriority().equalsIgnoreCase("asc") ?
                                priority1.compareTo(priority2) : priority2.compareTo(priority1);

                        if (result == 0) {
                            result = compareDueDates(td1, td2, dto.getSortByDueDate());
                        }
                        return result;
                    })
                    .collect(Collectors.toList());
        } else if (!dto.getSortByPriority().isEmpty()) {
            tds = tds.stream()
                    .sorted((td1, td2) -> {
                        Integer priority1 = PRIORITY_MAP.get(td1.getPriority());
                        Integer priority2 = PRIORITY_MAP.get(td2.getPriority());
                        return dto.getSortByPriority().equalsIgnoreCase("asc") ?
                                priority1.compareTo(priority2) : priority2.compareTo(priority1);
                    })
                    .collect(Collectors.toList());
        } else if (!dto.getSortByDueDate().isEmpty()) {
            tds = tds.stream()
                    .sorted((td1, td2) -> compareDueDates(td1, td2, dto.getSortByDueDate()))
                    .collect(Collectors.toList());
        }

        // Implement pagination
        int start = dto.getPageNumber() * pageSize;
        int end = Math.min(start + pageSize, tds.size());
        if (start > tds.size()) {
            return new ArrayList<>();
        }

        return tds.subList(start, end);
    }

    /**
     * Compares two ToDo items based on their due date.
     * Handles null values by placing them at the end or beginning, depending on sort order.
     *
     * @param td1       The first ToDo item.
     * @param td2       The second ToDo item.
     * @param sortOrder The sorting order ("asc" or "desc").
     * @return An integer indicating the comparison result.
     */
    private int compareDueDates(ToDo td1, ToDo td2, String sortOrder) {
        LocalDate dueDate1 = td1.getDueDate();
        LocalDate dueDate2 = td2.getDueDate();

        if (dueDate1 == null && dueDate2 == null) {
            return 0;
        } else if (dueDate1 == null) {
            return sortOrder.equalsIgnoreCase("asc") ? 1 : -1;
        } else if (dueDate2 == null) {
            return sortOrder.equalsIgnoreCase("asc") ? -1 : 1;
        }

        return sortOrder.equalsIgnoreCase("asc") ?
                dueDate1.compareTo(dueDate2) : dueDate2.compareTo(dueDate1);
    }

    /**
     * Calculates performance metrics for ToDo completion times.
     *
     * @return ResponseEntity containing the metrics of average time and grouped times by priority.
     */
    public ResponseEntity<MetricsDTO> getMetrics() {
        MetricsDTO dto = new MetricsDTO();
        List<ToDo> tds = toDoRepository.findByCriteria(new SearchDTO(null, "", "true", null, null, 0));
        dto.setAverageTime(averageTime(tds));
        dto.setLowTime(averageTime(tds.stream().filter(td -> "Low".equals(td.getPriority())).toList()));
        dto.setMediumTime(averageTime(tds.stream().filter(td -> "Medium".equals(td.getPriority())).toList()));
        dto.setHighTime(averageTime(tds.stream().filter(td -> "High".equals(td.getPriority())).toList()));
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    /**
     * Finds a ToDo item by its ID or throws a custom exception if not found.
     *
     * @param id The ID of the ToDo item to find.
     * @return The found ToDo item.
     * @throws ToDoNotFoundException if the ToDo is not found.
     */
    public ToDo findById(Long id) {
        return toDoRepository.findById(id)
                .orElseThrow(() -> new ToDoNotFoundException(id));
    }

    /**
     * Calculates the average time taken to complete ToDo items.
     *
     * @param tds The list of completed ToDo items.
     * @return A string representing the average time in HH:mm:ss format.
     */
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

    // Priority map used to map priority levels to integers for sorting
    private static final Map<String, Integer> PRIORITY_MAP = Map.of(
            "Low", 1,
            "Medium", 2,
            "High", 3
    );
}

