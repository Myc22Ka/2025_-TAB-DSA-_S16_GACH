package polsl.pl.tab.api.atraction.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "rates")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Rate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name; // np. "Standard Rate", "2 Attractions Deal"

    private BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "attraction_id", nullable = true)
    private Attraction attraction; // Może być null dla ofert ogólnych np. pakietów
}

