package polsl.pl.tab.api.user.dto;

import lombok.*;
import polsl.pl.tab.api.user.model.Role;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String firstname;
    private String lastname;
    private String email;
    private Role role;
}
