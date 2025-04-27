package polsl.pl.tab.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Global exception handler for the application.
 * Catches and handles common exceptions, formatting them into a consistent error response.
 */
@ControllerAdvice
@Slf4j
public class AppExceptionController {
    /**
     * DTO for returning standardized error responses.
     *
     * @param timestamp The time the error occurred.
     * @param error     The general error type (e.g., Bad Request, Unauthorized).
     * @param messages  A list of detailed error messages.
     * @param status    HTTP status code.
     */
    public record ErrorResponse(
            String timestamp,
            String error,
            List<String> messages,
            int status
    ) {}

    /**
     * Creates a structured error response with a timestamp and given HTTP status and messages.
     *
     * @param status   The HTTP status of the error.
     * @param messages List of error messages to include.
     * @return A populated {@link ErrorResponse} object.
     */
    private ErrorResponse generateErrorResponse(HttpStatus status, List<String> messages) {
        return new ErrorResponse(
                LocalDateTime.now().toString(),
                status.getReasonPhrase(),
                messages,
                status.value()
        );
    }

    /**
     * Handles bad credentials during authentication.
     *
     * @param ex The thrown {@link BadCredentialsException}.
     * @return A {@link ResponseEntity} containing the error response with HTTP 401 Unauthorized.
     */
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentialsException(BadCredentialsException ex) {
        List<String> messages = List.of("Invalid email or password");
        HttpStatus status = HttpStatus.UNAUTHORIZED;

        return new ResponseEntity<>(generateErrorResponse(status, messages), status);
    }

    /**
     * Handles custom application-specific auth exceptions.
     *
     * @param ex The thrown {@link AuthException}.
     * @return A {@link ResponseEntity} with HTTP 401 Unauthorized and a custom message.
     */
    @ExceptionHandler(AuthException.class)
    public ResponseEntity<ErrorResponse> handleAuthException(AuthException ex) {
        List<String> messages = List.of(ex.getMessage());
        HttpStatus status = HttpStatus.UNAUTHORIZED;

        return new ResponseEntity<>(generateErrorResponse(status, messages), status);
    }

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ErrorResponse> handleAppException(AppException ex) {
        List<String> messages = List.of(ex.getMessage());
        HttpStatus status = HttpStatus.BAD_REQUEST;

        return new ResponseEntity<>(generateErrorResponse(status, messages), status);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDeniedException(AccessDeniedException ex) {
        List<String> messages = List.of(ex.getMessage());
        HttpStatus status = HttpStatus.FORBIDDEN;

        return new ResponseEntity<>(generateErrorResponse(status, messages), status);
    }

    /**
     * Handles validation errors for @Valid annotated inputs.
     *
     * @param ex The thrown {@link MethodArgumentNotValidException}.
     * @return A {@link ResponseEntity} with a list of validation error messages and HTTP 401 Unauthorized.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<String> messages = new ArrayList<>();
        HttpStatus status = HttpStatus.UNAUTHORIZED;

        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String errorMessage = error.getDefaultMessage();
            messages.add(errorMessage);
        });

        return new ResponseEntity<>(generateErrorResponse(status, messages), status);
    }

    /**
     * Handles cases where a user is not found by uuid/login/email.
     *
     * @param ex The thrown {@link UsernameNotFoundException}.
     * @return A {@link ResponseEntity} with HTTP 404 Not Found and appropriate message.
     */
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUsernameNotFoundException(UsernameNotFoundException ex) {
        List<String> messages = List.of(ex.getMessage());
        HttpStatus status = HttpStatus.NOT_FOUND;

        return new ResponseEntity<>(generateErrorResponse(status, messages), status);
    }

    /**
     * Catches and handles all unhandled generic exceptions.
     *
     * @param ex The thrown {@link Exception}.
     * @return A {@link ResponseEntity} with HTTP 500 Internal Server Error and the exception message.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        List<String> messages = List.of(ex.getMessage());
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        log.info("Exception: {}", ex.getMessage());

        return new ResponseEntity<>(generateErrorResponse(status, messages), status);
    }
}

