package polsl.pl.tab.api.management.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import polsl.pl.tab.api.user.model.Role;
import polsl.pl.tab.api.user.model.User;

/**
 * Entity representing a role change request submitted by a user.
 */
@Entity
@Table(name = "role_change_requests")
@Setter
@Getter
public class RoleChangeRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private Role requestedRole;

    @Enumerated(EnumType.STRING)
    private Status status;
}