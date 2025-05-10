package polsl.pl.tab.api.atraction.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Entity
@Table(name = "opening_hours")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OpeningHour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalTime openingTime;
    private LocalTime closingTime;

    @Enumerated(EnumType.STRING)
    private DayOfWeek dayOfWeek;

    @ManyToOne
    @JoinColumn(name = "attraction_id")
    private Attraction attraction;
}
