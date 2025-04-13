package polsl.pl.tab.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String login;
    private String token;
    private String firstName;
    private String lastName;
    private String photoUrl;
    private String email;
    private Double cash;
    private LocalDateTime createdAt;
    private Long phoneNumber;
    private String address;
    private LocalDate dateOfBirth;
    private String gender;
}