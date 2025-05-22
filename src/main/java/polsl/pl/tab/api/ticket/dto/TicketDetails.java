package polsl.pl.tab.api.ticket.dto;

import java.time.LocalDate;

public record TicketDetails(
        Integer id,
        Integer timeLimit,
        Integer entryLimit,
        LocalDate availabilityFrom,
        LocalDate availabilityUntil,
        String ticketType,
        Boolean used) {
}
