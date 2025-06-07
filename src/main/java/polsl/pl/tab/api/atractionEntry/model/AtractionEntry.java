package polsl.pl.tab.api.atractionEntry.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "atraction_entry")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AtractionEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "atraction_id")
    private Integer atraction_id;

    @Column(name = "user_id")
    private Integer user_id;

    @Column(name = "peoplecount")
    private Integer peoplecount;

    @Column(name = "duration")
    private Integer duration;
}
