package polsl.pl.tab.api.ticket.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import polsl.pl.tab.api.user.model.User;

import java.time.LocalDate;

@Entity
@Table(name = "tickets")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer timeLimit;
    private Integer entryLimit;
    private LocalDate availabilityFrom;
    private LocalDate availabilityUntil;
    private String ticketType;
    private Boolean used;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
