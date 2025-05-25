package polsl.pl.tab.api.user.dto;

import java.time.LocalDate;

public record UpdateUserRequest (
        String firstname,
        String lastname,
        String phoneNumber,
        String address,
        String photoUrl,
        LocalDate dateOfBirth,
        String gender
) {}
