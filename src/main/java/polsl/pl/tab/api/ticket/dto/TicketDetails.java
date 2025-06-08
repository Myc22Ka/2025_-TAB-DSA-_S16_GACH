package polsl.pl.tab.api.ticket.dto;

import polsl.pl.tab.api.atraction.dto.AttractionDetails;
import polsl.pl.tab.api.ticket.model.Ticket;

import java.time.LocalDateTime;

public record TicketDetails(
        Integer id,
        LocalDateTime purchaseTime,
        LocalDateTime availabilityTo,
        String status,
        Double price,
        Long validDurationMinutes,
        LocalDateTime usedTime,
        AttractionDetails attractionDetails,
        String attractionName
) {
    public static TicketDetails fromEntity(Ticket ticket, int currentPeopleAmount) {
        return new TicketDetails(
                ticket.getId(),
                ticket.getPurchaseTime(),
                ticket.getAvailabilityTo(),
                ticket.getStatus().name(),
                ticket.getPrice(),
                ticket.getValidDuration().toMinutes(),
                ticket.getUsedTime(),
                new AttractionDetails(
                        ticket.getAttraction().getName(),
                        ticket.getAttraction().getDescription(),
                        ticket.getAttraction().getImageUrl(),
                        ticket.getAttraction().getPrice(),
                        ticket.getAttraction().getMaxPeopleAmount(),
                        currentPeopleAmount
                ),
                ticket.getAttraction().getName()
        );
    }
}
