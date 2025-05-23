package polsl.pl.tab.api.activity.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "activities")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalDateTime activityTime;

    private Integer activityDuration;

    private Integer entryLimit;

    private String activityType;

    private Integer available;

    private Double price;
}
