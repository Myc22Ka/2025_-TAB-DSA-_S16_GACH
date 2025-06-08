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

    @PostMapping("/{ticketId}/activate")
    public ResponseEntity<SuccessResponse> activateTicket(
            Authentication authentication,
            @PathVariable Integer ticketId) {

        ticketService.activateTicket(authentication, ticketId);

        SuccessResponse response = new SuccessResponse(
                LocalDateTime.now().toString(),
                "Ticket activated successfully",
                200
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/refund")
    public ResponseEntity<SuccessResponse> refundTicket(
            Authentication authentication,
            @RequestParam Integer ticketId) {

        ticketService.refundTicket(authentication, ticketId);

        SuccessResponse response = new SuccessResponse(
                LocalDateTime.now().toString(),
                "Ticket refunded successfully",
                200
        );

        return ResponseEntity.ok(response);
    }
}
