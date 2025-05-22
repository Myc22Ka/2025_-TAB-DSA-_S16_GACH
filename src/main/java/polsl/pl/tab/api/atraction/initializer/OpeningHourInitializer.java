package polsl.pl.tab.api.atraction.initializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import polsl.pl.tab.api.atraction.model.OpeningHour;
import polsl.pl.tab.api.atraction.repository.OpeningHourRepository;

import java.io.InputStream;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class OpeningHourInitializer {

    private final OpeningHourRepository openingHourRepository;

    @Bean
    public CommandLineRunner initOpeningHours(ObjectMapper objectMapper) {
        return args -> {
            if (openingHourRepository.count() == 0) {
                try (InputStream is = getClass().getClassLoader().getResourceAsStream("static/opening_hours.json")) {
                    if (is == null) {
                        throw new IllegalArgumentException("Could not find static/opening_hours.json in classpath.");
                    }

                    OpeningHoursWrapper wrapper = objectMapper.readValue(is, OpeningHoursWrapper.class);
                    openingHourRepository.saveAll(wrapper.getOpeningHours());
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        };
    }

    // Wrapper for outer "openingHours": [ ... ]
    @Setter
    @Getter
    public static class OpeningHoursWrapper {
        private List<OpeningHour> openingHours;
    }
}
