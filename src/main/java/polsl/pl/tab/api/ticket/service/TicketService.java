package polsl.pl.tab.api.ticket.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import polsl.pl.tab.api.atraction.model.Attraction;
import polsl.pl.tab.api.atraction.repository.AttractionRepository;
import polsl.pl.tab.api.ticket.dto.TicketDetails;
import polsl.pl.tab.api.ticket.model.Ticket;
import polsl.pl.tab.api.ticket.model.TicketStatus;
import polsl.pl.tab.api.ticket.repository.TicketRepository;
import polsl.pl.tab.api.user.model.Role;
import polsl.pl.tab.api.user.model.User;
import polsl.pl.tab.api.user.repository.UserRepository;
import polsl.pl.tab.exception.AppException;

import java.time.Duration;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final AttractionRepository attractionRepository;

    public void giveTicketToUser(Authentication authentication, String email, Integer attractionId, Duration duration) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Attraction attraction = attractionRepository.findById(attractionId)
                .orElseThrow(() -> new EntityNotFoundException("Attraction not found"));

        String cashierEmail = authentication.getName();

        User cashier = userRepository.findByEmail(cashierEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if(cashier.getRole() != Role.CASHIER) {
            throw new AppException("You need to be cashier in order to give tickets");
        }

        Ticket ticket = Ticket.builder()
                .user(user)
                .attraction(attraction)
                .validDuration(duration)
                .status(TicketStatus.INACTIVE)
                .price(attraction.getPrice())
                .usedTime(null)
                .build();

        ticketRepository.save(ticket);
    }
//
//    public boolean isValid(Ticket ticket) {
//        return ticket.getUsed() != null && !ticket.getUsed();
//    }
//
//    public void useTicket(Integer ticketId) {
//        Ticket ticket = ticketRepository.findById(ticketId)
//                .orElseThrow(() -> new IllegalArgumentException("Ticket not found"));
//        ticket.setUsed(true);
//        ticketRepository.save(ticket);
//    }
//
//    public void deleteTicket(Integer ticketId) {
//        ticketRepository.deleteById(ticketId);
//    }
//
    public List<TicketDetails> getAllUserTickets(Authentication authentication) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return ticketRepository.findByUser(user).stream()
                .map(TicketDetails::fromEntity)
                .toList();
    }
//
//    public void buyTicket(Ticket ticket) {
//        ticket.setUsed(false);
//        ticketRepository.save(ticket);
//    }
//
//    public void createTicket(Ticket ticket) {
//        ticketRepository.save(ticket);
//    }
//
//    public List<Ticket> getTicketsByUserId(long userId) {
//        return ticketRepository.findTicketByUserId(userId).orElse(List.of());
//    }
}
