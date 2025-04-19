package polsl.pl.tab.auth.dto;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import polsl.pl.tab.api.user.model.Role;
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

    private String firstname;
    private String lastname;

    @Email(message = "Please provide a valid email address")
    private String email;

    @Password
    private String password;
    private Role role;
}
