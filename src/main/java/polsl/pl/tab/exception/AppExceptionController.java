package polsl.pl.tab.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
@Slf4j
public class AppExceptionController {
    public record ErrorResponse(
            String timestamp,
            String error,
            List<String> messages,
            int status
    ) {}

    private ErrorResponse generateErrorResponse(HttpStatus status, List<String> messages) {
        return new ErrorResponse(
                LocalDateTime.now().toString(),
                status.getReasonPhrase(),
                messages,
                status.value()
        );
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentialsException(BadCredentialsException ex) {
        List<String> messages = List.of("Invalid email or password");
        HttpStatus status = HttpStatus.UNAUTHORIZED;

        return new ResponseEntity<>(generateErrorResponse(status, messages), status);
    }

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ErrorResponse> handleAppException(AppException ex) {
        List<String> messages = List.of(ex.getMessage());
        HttpStatus status = HttpStatus.UNAUTHORIZED;

        return new ResponseEntity<>(generateErrorResponse(status, messages), status);
    }

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

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        List<String> messages = List.of(ex.getMessage());
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        return new ResponseEntity<>(generateErrorResponse(status, messages), status);
    }
}

