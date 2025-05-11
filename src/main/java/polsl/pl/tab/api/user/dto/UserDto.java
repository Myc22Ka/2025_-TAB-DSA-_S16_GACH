package polsl.pl.tab.api.user.dto;

import polsl.pl.tab.api.user.model.Role;

import java.time.LocalDate;

public record UserDto (
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
) {}
