package polsl.pl.tab.api.user.model;

import jakarta.persistence.*;

import java.time.LocalTime;
import java.util.Collection;
import java.util.List;

import jakarta.validation.constraints.Email;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import polsl.pl.tab.auth.model.Token;

@Entity
@Table(name = "activity")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalTime activityTime;
    private Integer activityDuration;
    private Integer entryLimit;
    private String activityType;
    private Boolean available;
    private Double price;

    @ManyToOne
    @JoinColumn(name = "instructor_id")
    private Instructor instructor;
}

