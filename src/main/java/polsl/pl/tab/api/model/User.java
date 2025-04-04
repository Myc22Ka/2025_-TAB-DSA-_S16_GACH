package polsl.pl.tab.api.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String login;

    @Column(name="password", nullable = false)
    private String password;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "photo_url", nullable = false)
    private String photoUrl;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name="cash", nullable = false)
    private Double cash;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "phone_number", updatable = false)
    private Long phoneNumber;

    @Column(name = "address", updatable = false)
    private String address;

    @Column(name = "date", updatable = false)
    private LocalDate dateOfBirth;

    @Column(name = "gender", updatable = false)
    private String gender;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
