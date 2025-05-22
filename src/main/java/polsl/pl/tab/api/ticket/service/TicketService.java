package polsl.pl.tab.api.ticket.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import polsl.pl.tab.api.ticket.model.Ticket;
import polsl.pl.tab.api.ticket.repository.TicketRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;

    public boolean isValid(Ticket ticket) {
        return ticket.getUsed() != null && !ticket.getUsed();
    }

    public void useTicket(Integer ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new IllegalArgumentException("Ticket not found"));
        ticket.setUsed(true);
        ticketRepository.save(ticket);
    }

    public void deleteTicket(Integer ticketId) {
        ticketRepository.deleteById(ticketId);
    }

    public List<Ticket> getAllValidTickets() {
        return ticketRepository.findTicketByUsed(false).orElse(List.of());
    }

    public void buyTicket(Ticket ticket) {
        ticket.setUsed(false);
        ticketRepository.save(ticket);
    }

    public void createTicket(Ticket ticket) {
        ticketRepository.save(ticket);
    }

    public List<Ticket> getTicketsByUserId(long userId) {
        return ticketRepository.findTicketByUserId(userId).orElse(List.of());
    }
}
