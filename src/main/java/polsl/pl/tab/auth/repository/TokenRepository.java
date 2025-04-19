package polsl.pl.tab.auth.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import polsl.pl.tab.auth.model.Token;

/**
 * Repository interface for managing {@link Token} entities.
 * Provides methods for finding tokens by user or by token string.
 */
public interface TokenRepository extends JpaRepository<Token, Integer> {

    /**
     * Retrieves all valid tokens for a specific user.
     * A token is considered valid if it is not expired or not revoked.
     *
     * @param id the ID of the user
     * @return a list of valid tokens for the given user
     */
    List<Token> findByUser_IdAndExpiredFalseOrRevokedFalse(Integer id);

    /**
     * Finds a token by its token string.
     *
     * @param token the token string
     * @return an {@link Optional} containing the token if found
     */
    Optional<Token> findByToken(String token);
}
