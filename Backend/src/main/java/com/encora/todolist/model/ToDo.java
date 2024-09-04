package com.encora.todolist.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "to_dos")
public class ToDo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(name = "text", nullable = false, length=120)
    @NonNull
    private String text;
    
    @Column(name = "due_date", nullable = true)
    private LocalDate dueDate;
    
    @Column(name = "done", nullable = false)
    @NonNull
    private Boolean done;
    
    @Column(name = "done_date", nullable = true)
    private LocalDateTime doneDate;
    
    @Column(name = "priority", nullable = false)
    @NonNull
    private String priority;
    
    @Column(name = "creation_date", nullable = false)
    @NonNull
    private LocalDateTime creationDate;

    @Override
    public String toString() {
        return "ToDo{ " + "id=" + id + ", text=" + text + ", dueDate=" + dueDate + ", done=" + done + ", doneDate=" + doneDate + ", priority=" + priority + ", creationDate=" + creationDate + " }";
    }
}
