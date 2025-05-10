package polsl.pl.tab.api.atraction.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "attractions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attraction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String description;

    private Integer maxPeopleAmount;
    private Integer currentPeopleAmount;

    // Godziny otwarcia (każda godzina reprezentuje możliwe otwarcie raz na godzinę)
    @OneToMany(mappedBy = "attraction", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OpeningHour> openingHours;

    // Stawki przypisane do danej atrakcji
    @OneToMany(mappedBy = "attraction", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Rate> rates;
}
