package polsl.pl.tab.auth.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import polsl.pl.tab.api.user.model.User;

/**
 * Represents a security token JWT associated with a user.
 * Used for managing authentication and authorization in the system.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Token {

    /**
     * Unique identifier for the token. Auto-generated.
     */
    @Id
    @GeneratedValue
    public Integer id;

    /**
     * The actual token string (e.g. JWT).
     * Must be unique in the database.
     */
    @Column(unique = true)
    public String token;

    /**
     * The type of token, e.g., BEARER.
     */
    @Enumerated(EnumType.STRING)
    public TokenType tokenType = TokenType.BEARER;

    /**
     * Indicates whether the token has been manually revoked.
     * Revoked tokens are no longer considered valid.
     */
    public boolean revoked;

    /**
     * Indicates whether the token has expired.
     * Expired tokens cannot be used for authentication.
     */
    public boolean expired;

    /**
     * The user to whom this token belongs.
     * A user can have multiple tokens.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    public User user;
}
