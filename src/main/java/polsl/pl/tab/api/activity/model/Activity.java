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

    @Column(name = "activityTime")
    private LocalDateTime activityTime;

    @Column(name = "activityDuration")
    private Integer activityDuration;

    @Column(name = "entryLimit")
    private Integer entryLimit;

    @Column(name = "activityType")
    private String activityType;

    @Column(name = "available")
    private Integer available;

    @Column(name = "price")
    private Double price;
}
