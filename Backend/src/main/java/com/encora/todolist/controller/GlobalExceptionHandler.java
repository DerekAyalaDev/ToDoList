package com.encora.todolist.controller;

import com.encora.todolist.exception.ToDoNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles validation exceptions thrown when request body fails validation constraints.
     * This method is invoked when a `@Valid` annotated request body has invalid fields.
     * The method collects all validation errors and returns them in a structured format.
     *
     * @param ex The exception thrown during validation.
     * @return ResponseEntity containing a map of field names and their respective error messages.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        // Collect all field errors and their messages from the binding result
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        // Return a bad request response with the validation errors
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles missing path variable exceptions.
     * This exception occurs when an expected path variable in the URL is missing.
     *
     * @param ex The exception indicating the missing path variable.
     * @return ResponseEntity containing the name of the missing variable and a bad request status.
     */
    @ExceptionHandler(MissingPathVariableException.class)
    public ResponseEntity<Map<String, String>> handleMissingPathVariable(MissingPathVariableException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("error", "Missing path variable: " + ex.getVariableName());

        // Return a bad request response with the missing path variable error
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles exceptions when the request body is not readable, malformed, or missing.
     * This exception typically occurs when the body of a POST or PUT request is not correctly formed
     * or when the body is expected but not provided.
     *
     * @param ex The exception indicating the malformed or missing request body.
     * @return ResponseEntity containing an error message and a bad request status.
     */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> handleHttpMessageNotReadable(HttpMessageNotReadableException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "Request body is missing or malformed");

        // Return a bad request response with the error message
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles custom exceptions when a requested ToDo item is not found.
     * This exception is thrown when a specific ToDo cannot be located by its ID or other identifier.
     *
     * @param ex The exception indicating the ToDo item was not found.
     * @return ResponseEntity containing the error message from the exception and a not found status.
     */
    @ExceptionHandler(ToDoNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleToDoNotFoundException(ToDoNotFoundException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", ex.getMessage());

        // Return a not found response with the specific error message
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
}
