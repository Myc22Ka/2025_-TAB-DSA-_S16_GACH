package polsl.pl.tab.api.user.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import jakarta.validation.constraints.Email;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import polsl.pl.tab.auth.model.Token;

@Entity
@Table(name = "ticket")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer timeLimit;
    private Integer entryLimit;
    private LocalDate availabilityFrom;
    private LocalDate availabilityUntil;
    private String ticketType;
    private Boolean used;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}

