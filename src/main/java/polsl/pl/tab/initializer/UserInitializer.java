package polsl.pl.tab.initializer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import polsl.pl.tab.api.model.User;
import polsl.pl.tab.api.repository.UserRepository;

import java.time.LocalDate;

@Configuration
public class UserInitializer {

    @Bean
    public CommandLineRunner initUsers(UserRepository userRepository) {
        return args -> {
            if (!userRepository.existsByLogin("admin")) {
                User user = new User();
                user.setLogin("admin");
                user.setPassword("admin123");
                user.setFirstName("Jan");
                user.setLastName("Kowalski");
                user.setPhotoUrl("https://example.com/photo.jpg");
                user.setEmail("jan.kowalski@example.com");
                user.setCash(1000.0);
                user.setPhoneNumber(123456789L);
                user.setAddress("ul. Przykładowa 1");
                user.setDateOfBirth(LocalDate.of(1990, 1, 1));
                user.setGender("M");

                userRepository.save(user);
            }
        };
    }
}