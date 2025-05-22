package polsl.pl.tab.api.atraction.initializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import polsl.pl.tab.api.atraction.model.Attraction;
import polsl.pl.tab.api.atraction.repository.AttractionRepository;

import java.io.InputStream;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class AtractionInitializer {

    private final AttractionRepository atractionRepository;

    @Bean
    public CommandLineRunner initAtractions(ObjectMapper objectMapper) {
        return args -> {
            if (atractionRepository.count() == 0) {
                try (InputStream is = getClass().getClassLoader().getResourceAsStream("static/attractions.json")) {
                    if (is == null) {
                        throw new IllegalArgumentException("Could not find static/attractions.json in classpath.");
                    }

                    AtractionsWrapper wrapper = objectMapper.readValue(is, AtractionsWrapper.class);
                    atractionRepository.saveAll(wrapper.getAtractions());
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        };
    }

    // Wrapper for outer "atractions": [ ... ]
    @Setter
    @Getter
    public static class AtractionsWrapper {
        private List<Attraction> atractions;
    }
}
