package polsl.pl.tab.api.ticket.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import polsl.pl.tab.api.ticket.model.Ticket;
import polsl.pl.tab.api.ticket.service.TicketService;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @GetMapping("/valid")
    public ResponseEntity<List<Ticket>> getAllValidTickets() {
        return ResponseEntity.ok(ticketService.getAllValidTickets());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Ticket>> getTicketsByUserId(@PathVariable long userId) {
        return ResponseEntity.ok(ticketService.getTicketsByUserId(userId));
    }

    @PostMapping("/use/{id}")
    public ResponseEntity<?> useTicket(@PathVariable Integer id) {
        ticketService.useTicket(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable Integer id) {
        ticketService.deleteTicket(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/buy")
    public ResponseEntity<?> buyTicket(@RequestBody Ticket ticket) {
        ticketService.buyTicket(ticket);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTicket(@RequestBody Ticket ticket) {
        ticketService.createTicket(ticket);
        return ResponseEntity.ok().build();
    }
}
