package polsl.pl.tab.auth.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import polsl.pl.tab.auth.validator.Password;

/**
 * A DTO representing the registration request payload.
 * Used to collect user input during the registration process.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    @Size(min = 3, message = "Login is to short")
    private String login;

    @Email(message = "Please provide a valid email address")
    private String email;

    @Password
    private String password;
}
