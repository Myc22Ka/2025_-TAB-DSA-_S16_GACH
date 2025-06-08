package polsl.pl.tab.api.user.initializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import polsl.pl.tab.api.user.model.User;
import polsl.pl.tab.api.user.repository.UserRepository;

import java.io.InputStream;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class UserInitializer {

    private final UserRepository userRepository;

    @Bean
    @Order(1)
    public CommandLineRunner initUsers(ObjectMapper objectMapper) {
        return args -> {
            System.out.println("[INIT] UserInitializer");

            if (userRepository.count() == 0) {
                try (InputStream is = getClass().getClassLoader().getResourceAsStream("static/users.json")) {
                    if (is == null) {
                        throw new IllegalArgumentException("Could not find static/users.json in classpath.");
                    }

                    UsersWrapper wrapper = objectMapper.readValue(is, UsersWrapper.class);
                    userRepository.saveAll(wrapper.getUsers());
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        };
    }

    // Wrapper for outer "users": [ ... ]
    @Setter
    @Getter
    public static class UsersWrapper {
        private List<User> users;

    }
}
