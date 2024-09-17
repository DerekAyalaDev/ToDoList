package com.encora.todolist.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MetricsDTO {

    // Average time taken to complete all ToDos, formatted as HH:mm:ss
    private String averageTime;

    // Average time taken to complete Low priority ToDos
    private String lowTime;

    // Average time taken to complete Medium priority ToDos
    private String MediumTime;

    // Average time taken to complete High priority ToDos
    private String highTime;
}

