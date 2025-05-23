package polsl.pl.tab.api.ticket.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import polsl.pl.tab.api.ticket.dto.TicketDetails;
import polsl.pl.tab.api.ticket.service.TicketService;
import polsl.pl.tab.exception.SuccessResponse;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @PostMapping("/give")
    public ResponseEntity<SuccessResponse> giveTicketToUser(
            Authentication authentication,
            @RequestParam String email,
            @RequestParam Integer attractionId,
            @RequestParam Long durationMinutes) {

        Duration duration = Duration.ofMinutes(durationMinutes);

        ticketService.giveTicketToUser(authentication, email, attractionId, duration);

        SuccessResponse response = new SuccessResponse(
                LocalDateTime.now().toString(),
                "Ticket successfully issued to user",
                200
        );

        return ResponseEntity.ok(response);
    }


    @GetMapping("/me")
    public ResponseEntity<List<TicketDetails>> getAllUserTickets(Authentication authentication) {
        return ResponseEntity.ok(ticketService.getAllUserTickets(authentication));
    }
//
//    @GetMapping("/user/{userId}")
//    public ResponseEntity<List<Ticket>> getTicketsByUserId(@PathVariable long userId) {
//        return ResponseEntity.ok(ticketService.getTicketsByUserId(userId));
//    }
//
//    @PostMapping("/use/{id}")
//    public ResponseEntity<?> useTicket(@PathVariable Integer id) {
//        ticketService.useTicket(id);
//        return ResponseEntity.ok().build();
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteTicket(@PathVariable Integer id) {
//        ticketService.deleteTicket(id);
//        return ResponseEntity.ok().build();
//    }
//
//    @PostMapping("/buy")
//    public ResponseEntity<?> buyTicket(@RequestBody Ticket ticket) {
//        ticketService.buyTicket(ticket);
//        return ResponseEntity.ok().build();
//    }
//
//    @PostMapping("/create")
//    public ResponseEntity<?> createTicket(@RequestBody Ticket ticket) {
//        ticketService.createTicket(ticket);
//        return ResponseEntity.ok().build();
//    }
}
