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
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue
    private Integer id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user")
    private List<Token> tokens;

//    @Column(name = "photo_url")
//    private String photoUrl;

//    @Column(name="cash", nullable = false)
//    private Double cash;
//
//    @Column(name = "created_at", updatable = false)
//    private LocalDateTime createdAt;
//
//    @Column(name = "phone_number")
//    private Long phoneNumber;
//
//    @Column(name = "address")
//    private String address;
//
//    @Column(name = "date")
//    private LocalDate dateOfBirth;
//
//    @Column(name = "gender")
//    private String gender;

//    @PrePersist
//    public void prePersist() {
//        this.createdAt = LocalDateTime.now();
//    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }
}
