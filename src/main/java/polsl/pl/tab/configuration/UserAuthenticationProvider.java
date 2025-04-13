package polsl.pl.tab.configuration;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.*;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import polsl.pl.tab.auth.dto.UserDto;
import polsl.pl.tab.auth.model.User;
import polsl.pl.tab.auth.repository.UserRepository;
import polsl.pl.tab.exception.AuthException;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;

@Slf4j
@RequiredArgsConstructor
@Component
public class UserAuthenticationProvider {

    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    private final UserRepository userRepository;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(String login) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 60000); // 1 hour

        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        return JWT.create()
                .withSubject(login)
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .sign(algorithm);
    }

    public Authentication validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decoded = verifier.verify(token);

            if (decoded.getExpiresAt().before(new Date())) {
                throw new AuthException("Token has expired", HttpStatus.UNAUTHORIZED);
            }

            User user = userRepository.findByLogin(decoded.getSubject())
                    .orElseThrow(() -> new AuthException("User not found", HttpStatus.NOT_FOUND));

            String newToken = createToken(user.getLogin());

            UserDto userDto = UserDto.builder()
                    .id(user.getId())
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .email(user.getEmail())
                    .login(user.getLogin())
                    .cash(user.getCash())
                    .token(newToken)
                    .build();

            return new UsernamePasswordAuthenticationToken(userDto, null, Collections.emptyList());
        } catch (TokenExpiredException e) {
            throw new AuthException("Token has expired", HttpStatus.UNAUTHORIZED);
        } catch (JWTVerificationException e) {
            throw new AuthException("Invalid token", HttpStatus.UNAUTHORIZED);
        }
    }
}
