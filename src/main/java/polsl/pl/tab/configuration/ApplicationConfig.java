package polsl.pl.tab.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import polsl.pl.tab.auditing.ApplicationAuditAware;
import polsl.pl.tab.api.user.repository.UserRepository;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme.Type;

/**
 * Application configuration class that defines security-related beans
 * such as authentication providers, user details services, and password encoders.
 */
@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final UserRepository userRepository;

    /**
     * Provides a way to load user-specific data based on the username (email).
     * This implementation fetches the user from the database using UserRepository.
     *
     * @return UserDetailsService instance that looks up users by email
     */
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    /**
     * Configures the authentication provider using DAO-based authentication.
     * It sets up the user details service and password encoder for validating credentials.
     *
     * @return configured AuthenticationProvider bean
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    /**
     * Provides an auditor aware implementation used for auditing created/modified by fields.
     *
     * @return AuditorAware that supplies the current user's ID
     */
    @Bean
    public AuditorAware<Integer> auditorAware() {
        return new ApplicationAuditAware();
    }

    /**
     * Defines the password encoder bean using BCrypt, which is a strong hashing algorithm.
     *
     * @return a PasswordEncoder instance for encoding and verifying passwords
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Provides the authentication manager bean used by Spring Security to authenticate users.
     *
     * @param config the authentication configuration provided by Spring
     * @return AuthenticationManager from the configuration
     * @throws Exception if unable to get the authentication manager
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * Initializes an in-memory user for testing or development purposes.
     * This is separate from the database-backed user service.
     *
     * @return an in-memory UserDetailsService containing a default admin user
     */
    @Bean
    public UserDetailsService initUser() {
        UserDetails user = User.builder()
                .username("admin")
                .password("{noop}password")
                .roles("USER")
                .build();

        return new InMemoryUserDetailsManager(user);
    }

    /**
     * Configures the OpenAPI documentation for the application.
     * Information will be displayed in Swagger UI.
     *
     * @return an OpenAPI instance with custom metadata
     */
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("TAB Project")
                        .version("1.0")
                        .description("API documentation for testing backend application"))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                .components(new io.swagger.v3.oas.models.Components()
                        .addSecuritySchemes("bearerAuth", new SecurityScheme()
                                .type(Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("Use `Bearer <token>` for Authorization")));
    }
}
