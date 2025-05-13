package polsl.pl.tab.api.user.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateUserRequest {

    private String firstname;
    private String lastname;
    private String phoneNumber;
    private String address;
    private String photoUrl;
    private LocalDate dateOfBirth;
    private String gender;
}
