package com.encora.todolist.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MetricsDTO {
    private String averageTime;
    private String lowTime;
    private String MediumTime;
    private String highTime;
}
