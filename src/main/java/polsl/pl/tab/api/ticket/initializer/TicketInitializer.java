package polsl.pl.tab.api.ticket.initializer;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import polsl.pl.tab.api.atraction.model.Attraction;
import polsl.pl.tab.api.atraction.repository.AttractionRepository;
import polsl.pl.tab.api.ticket.model.Ticket;
import polsl.pl.tab.api.ticket.model.TicketStatus;
import polsl.pl.tab.api.ticket.repository.TicketRepository;
import polsl.pl.tab.api.user.model.User;
import polsl.pl.tab.api.user.repository.UserRepository;

import java.io.InputStream;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Configuration
@RequiredArgsConstructor
public class TicketInitializer {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final AttractionRepository attractionRepository;

    @Bean
    @Order(3)
    public CommandLineRunner initTickets(ObjectMapper objectMapper) {
        return args -> {
            System.out.println("[INIT] TicketInitializer");

            if (ticketRepository.count() == 0) {
                try (InputStream is = getClass().getClassLoader().getResourceAsStream("static/tickets.json")) {
                    if (is == null) {
                        throw new IllegalArgumentException("Could not find static/tickets.json in classpath.");
                    }

                    List<RawTicket> rawTickets = objectMapper.readValue(
                            is,
                            objectMapper.getTypeFactory().constructCollectionType(List.class, RawTicket.class)
                    );

                    for (RawTicket raw : rawTickets) {
                        Optional<User> userOpt = userRepository.findById(raw.getUserId());
                        Optional<Attraction> attractionOpt = attractionRepository.findById(raw.getAttractionId());

                        if (userOpt.isEmpty() || attractionOpt.isEmpty()) {
                            System.err.printf("Skipping ticket with ID %d: user or attraction not found%n", raw.getId());
                            continue;
                        }

                        Ticket ticket = Ticket.builder()
                                .id(raw.getId())
                                .purchaseTime(raw.getPurchaseTime())
                                .availabilityTo(raw.getPurchaseTime().plusDays(30))
                                .status(raw.getStatus())
                                .price(raw.getPrice())
                                .ticketCode(null) // Will be generated in @PrePersist
                                .validDuration(Duration.ofMinutes(raw.getValidDuration()))
                                .usedTime(raw.getUsedTime())
                                .user(userOpt.get())
                                .attraction(attractionOpt.get())
                                .build();

                        ticketRepository.save(ticket);
                    }

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        };
    }

    @Getter
    @Setter
    public static class TicketsWrapper {
        private List<RawTicket> tickets;
    }

    @Getter
    @Setter
    public static class RawTicket {
        private Integer id;
        private LocalDateTime purchaseTime;
        private LocalDateTime availabilityTo;
        private String status;
        private Double price;
        private String ticketCode;
        private Integer validDuration;
        private LocalDateTime usedTime;

        @JsonProperty("userId")
        private Integer userId;

        @JsonProperty("attractionId")
        private Integer attractionId;

        public TicketStatus getStatus() {
            return TicketStatus.valueOf(status);
        }
    }
}
