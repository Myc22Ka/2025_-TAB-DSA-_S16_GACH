package polsl.pl.tab.api.ticket.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import polsl.pl.tab.api.atraction.dto.TimeRangeDTO;
import polsl.pl.tab.api.atraction.model.Attraction;
import polsl.pl.tab.api.user.model.User;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

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

    @Column(name = "purchase_time", nullable = false)
    private LocalDateTime purchaseTime;

    @Column(name = "availability_to")
    private LocalDateTime availabilityTo;

    @Enumerated(EnumType.STRING)
    private TicketStatus status;

    @Column(name = "price")
    private Double price;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "ticket_code", unique = true, nullable = false, length = 64)
    private String ticketCode;

    @Column(name = "valid_duration", nullable = false)
    private Duration validDuration;

    @Column(name = "used_time")
    private LocalDateTime usedTime;

    @ManyToOne
    @JoinColumn(name = "attraction_id", nullable = false)
    private Attraction attraction;

    @PrePersist
    protected void onCreate() {
        if (this.ticketCode == null) {
            this.ticketCode = UUID.randomUUID().toString();
        }
    }
}
