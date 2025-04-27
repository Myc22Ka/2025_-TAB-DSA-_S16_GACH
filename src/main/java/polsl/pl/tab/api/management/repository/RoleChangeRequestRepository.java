package polsl.pl.tab.api.management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import polsl.pl.tab.api.management.model.RoleChangeRequest;
import polsl.pl.tab.api.management.model.Status;
import polsl.pl.tab.api.user.model.User;

/**
 * Repository interface for managing role change requests.
 * Provides CRUD operations and custom query methods for role change requests.
 */
public interface RoleChangeRequestRepository extends JpaRepository<RoleChangeRequest, Long> {

    boolean existsByUserAndStatus(User user, Status status);
}
