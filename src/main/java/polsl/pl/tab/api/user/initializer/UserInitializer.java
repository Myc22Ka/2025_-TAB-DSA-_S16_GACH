package polsl.pl.tab.api.user.initializer;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class UserInitializer {

//    private final UserAuthenticationProvider userAuthenticationProvider;
//
//    @Bean
//    public CommandLineRunner initUsers(UserRepository userRepository) {
//        return args -> {
//            if (!userRepository.existsByLogin("admin")) {
//                User user = new User();
//                user.setLogin("admin");
//                user.setPassword("admin123");
//                user.setFirstName("Jan");
//                user.setLastName("Kowalski");
//                user.setPhotoUrl("https://example.com/photo.jpg");
//                user.setEmail("jan.kowalski@example.com");
//                user.setCash(1000.0);
//                user.setPhoneNumber(123456789L);
//                user.setAddress("ul. Przykładowa 1");
//                user.setDateOfBirth(LocalDate.of(1990, 1, 1));
//                user.setGender("M");
//
//                String token = userAuthenticationProvider.createToken(user.getLogin());
//                user.setToken(token);
//                userRepository.save(user);
//            }
//        };
//    }
}