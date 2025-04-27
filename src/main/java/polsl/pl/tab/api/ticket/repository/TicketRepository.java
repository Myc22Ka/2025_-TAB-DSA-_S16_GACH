package polsl.pl.tab.api.ticket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import polsl.pl.tab.api.ticket.model.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {
}