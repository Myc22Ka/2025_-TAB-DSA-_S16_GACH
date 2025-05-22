package polsl.pl.tab.api.ticket.initializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import polsl.pl.tab.api.ticket.model.Ticket;
import polsl.pl.tab.api.ticket.repository.TicketRepository;

import java.io.InputStream;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class TicketInitializer {

    private final TicketRepository ticketRepository;

    @Bean
    public CommandLineRunner initTickets(ObjectMapper objectMapper) {
        return args -> {
            if (ticketRepository.count() == 0) {
                try (InputStream is = getClass().getClassLoader().getResourceAsStream("tickets.json")) {
                    if (is == null) {
                        throw new IllegalArgumentException("Could not find static/ticket.json in classpath.");
                    }

                    TicketsWrapper wrapper = objectMapper.readValue(is, TicketsWrapper.class);
                    ticketRepository.saveAll(wrapper.getTickets());
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        };
    }

    @Getter
    @Setter
    public static class TicketsWrapper {
        private List<Ticket> tickets;

        public List<Ticket> getTickets()
        {
            return  tickets;
        }
    }
}
