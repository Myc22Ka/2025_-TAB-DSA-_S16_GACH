package polsl.pl.tab.api.user.model;

import jakarta.persistence.*;

import java.util.Collection;
import java.util.List;

import jakarta.validation.constraints.Email;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import polsl.pl.tab.auth.model.Token;

@Entity
@Table(name = "attraction_entry")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttractionEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer peopleCount;
    private Integer duration;

    @ManyToOne
    @JoinColumn(name = "attraction_id")
    private Attraction attraction;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}

