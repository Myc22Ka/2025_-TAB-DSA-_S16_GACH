package polsl.pl.tab.api.ticket.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
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
import java.time.LocalDateTime;
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

        ticket.setPurchaseTime(LocalDateTime.now());
        ticket.setAvailabilityTo(ticket.getPurchaseTime().plusDays(7));

        user.setCash(user.getCash() - ticket.getPrice());

        ticketRepository.save(ticket);
        userRepository.save(user);
    }

    public void activateTicket(Authentication authentication, Integer ticketId) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new EntityNotFoundException("Ticket not found"));

        if (!ticket.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("You cannot activate someone else's ticket");
        }

        if (ticket.getStatus() != TicketStatus.INACTIVE) {
            throw new IllegalStateException("Only inactive tickets can be activated");
        }

        Attraction attraction = ticket.getAttraction();
        int currentActiveTickets = ticketRepository.countByAttractionAndStatus(attraction, TicketStatus.ACTIVE);

        if (currentActiveTickets >= attraction.getMaxPeopleAmount()) {
            throw new IllegalStateException("Attraction is full. Cannot activate ticket now.");
        }

        ticket.setStatus(TicketStatus.ACTIVE);
        ticket.setUsedTime(LocalDateTime.now());
        ticket.setAvailabilityTo(ticket.getUsedTime().plus(ticket.getValidDuration()));

        ticketRepository.save(ticket);
    }

    public List<TicketDetails> getAllUserTickets(Authentication authentication) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<Ticket> tickets = ticketRepository.findByUser(user);

        LocalDateTime now = LocalDateTime.now();

        boolean updated = false;
        for (Ticket ticket : tickets) {
            if (
                    (ticket.getStatus() == TicketStatus.INACTIVE && ticket.getAvailabilityTo().isBefore(now)) ||
                            (ticket.getUsedTime() != null && ticket.getStatus() == TicketStatus.ACTIVE && ticket.getUsedTime().plus(ticket.getValidDuration()).isBefore(now))
            ) {

                ticket.setStatus(TicketStatus.EXPIRED);
                updated = true;
            }
        }

        if (updated) {
            ticketRepository.saveAll(tickets);
        }

        return tickets.stream()
                .map(ticket -> {
                    int currentPeopleAmount = (int) ticketRepository.countByAttractionAndStatus(
                            ticket.getAttraction(), TicketStatus.ACTIVE);
                    return TicketDetails.fromEntity(ticket, currentPeopleAmount);
                })
                .toList();
    }

    public void refundTicket(Authentication authentication, Integer ticketId) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new AppException("Ticket not found"));

        if (!ticket.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("Cannot refund ticket that is not yours");
        }

        if (ticket.getStatus() != TicketStatus.INACTIVE) {
            throw new IllegalStateException("Only inactive tickets can be refunded");
        }

        if (ticket.getUsedTime() != null || ticket.getAvailabilityTo().isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Ticket cannot be refunded if already used or expired");
        }

        ticket.setStatus(TicketStatus.REFUNDED);

        user.setCash(user.getCash() + ticket.getPrice());

        userRepository.save(user);
        ticketRepository.save(ticket);
    }
}
