package polsl.pl.tab.api.user.dto;

import polsl.pl.tab.api.user.model.Role;
import polsl.pl.tab.api.user.model.User;

import java.time.LocalDate;

public record UserDto (
    Integer id,
    String login,
    String firstname,
    String lastname,
    String email,
    Role role,
    String photoUrl,
    Double cash,
    String phoneNumber,
    String address,
    LocalDate dateOfBirth,
    String gender
) {
    public static UserDto fromEntity(User user) {
        return new UserDto(
                user.getId(),
                user.getLogin(),
                user.getFirstname(),
                user.getLastname(),
                user.getEmail(),
                user.getRole(),
                user.getPhotoUrl(),
                user.getCash(),
                user.getPhoneNumber(),
                user.getAddress(),
                user.getDateOfBirth(),
                user.getGender()
        );
    }
}
