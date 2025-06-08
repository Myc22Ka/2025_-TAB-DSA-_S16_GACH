package polsl.pl.tab.api.instructor.model;

import jakarta.persistence.*;
import lombok.*;
import polsl.pl.tab.api.user.model.User;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "instructor_availability")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InstructorAvailability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "day_of_week", nullable = false)
    private DayOfWeek dayOfWeek;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id", nullable = false)
    private User instructor;

    @OneToMany(mappedBy = "availability", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InstructorAvailabilityHour> hours = new ArrayList<>();
}