package polsl.pl.tab.auth.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.ArrayList;
import java.util.List;

public class PasswordValidator implements ConstraintValidator<Password, String> {

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        if (password == null) {
            return false;
        }

        List<String> validationErrors = new ArrayList<>();

        // Check if password is at least 9 characters long
        if (password.length() < 9) {
            validationErrors.add("Password must be at least 9 characters long");
        }

        // Check if password contains at least one uppercase letter
        if (password.equals(password.toLowerCase())) {
            validationErrors.add("Password must contain at least one uppercase letter");
        }

        // Check if password contains at least one digit
        if (!password.matches(".*\\d.*")) {
            validationErrors.add("Password must contain at least one digit");
        }

        // Check if password contains at least one special character
        if (!password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?].*")) {
            validationErrors.add("Password must contain at least one special character");
        }

        // If there are validation errors, add them as separate constraint violations
        if (!validationErrors.isEmpty()) {
            context.disableDefaultConstraintViolation();

            // Add each error as a separate constraint violation
            for (String error : validationErrors) {
                context.buildConstraintViolationWithTemplate(error)
                        .addConstraintViolation();
            }

            return false;
        }

        return true;
    }
}
