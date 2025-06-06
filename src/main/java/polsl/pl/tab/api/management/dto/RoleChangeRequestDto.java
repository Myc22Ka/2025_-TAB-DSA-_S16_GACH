package polsl.pl.tab.api.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import polsl.pl.tab.api.management.model.Status;
import polsl.pl.tab.api.user.model.Role;

/**
 * Data Transfer Object (DTO) representing a role change request.
 */
@Data
@AllArgsConstructor
public class RoleChangeRequestDto {
    private Long id;
    private String userLogin;
    private Role currentRole;
    private Role requestedRole;
    private Status status;
}