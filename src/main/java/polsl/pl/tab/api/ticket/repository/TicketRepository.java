package polsl.pl.tab.api.ticket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import polsl.pl.tab.api.ticket.model.Ticket;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {

    Optional<List<Ticket>> findTicketByUserId(long id);

    Optional<List<Ticket>> findTicketByType(String type);

    Optional<List<Ticket>> findTicketByUsed(boolean used);

}