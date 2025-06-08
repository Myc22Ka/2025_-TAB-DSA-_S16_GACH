package polsl.pl.tab.api.ticket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import polsl.pl.tab.api.atraction.model.Attraction;
import polsl.pl.tab.api.ticket.model.Ticket;
import polsl.pl.tab.api.ticket.model.TicketStatus;
import polsl.pl.tab.api.user.model.User;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {

    List<Ticket> findByUser(User user);

    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.attraction.id = :attractionId AND t.status = 'ACTIVE'")
    long countActiveTicketsByAttractionId(@Param("attractionId") Integer attractionId);

    Integer countByAttractionAndStatus(Attraction attraction, TicketStatus ticketStatus);
}