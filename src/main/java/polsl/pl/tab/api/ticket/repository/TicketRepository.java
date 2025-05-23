package polsl.pl.tab.api.ticket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import polsl.pl.tab.api.ticket.model.Ticket;
import polsl.pl.tab.api.user.model.User;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {

    List<Ticket> findByUser(User user);

//    Optional<List<Ticket>> findTicketByUserId(long id);
//
//    Optional<List<Ticket>> findTicketByType(String type);
//
//    Optional<List<Ticket>> findTicketByUsed(boolean used);

}