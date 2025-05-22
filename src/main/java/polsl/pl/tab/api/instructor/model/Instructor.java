package polsl.pl.tab.api.instructor.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "instructor")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Instructor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String login;
    private String firstname;
    private String lastname;
    private String accesscode;
}

