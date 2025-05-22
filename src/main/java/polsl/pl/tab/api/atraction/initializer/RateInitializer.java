package polsl.pl.tab.api.atraction.initializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import polsl.pl.tab.api.atraction.model.Rate;
import polsl.pl.tab.api.atraction.repository.RateRepository;

import java.io.InputStream;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class RateInitializer {

    private final RateRepository rateRepository;

    @Bean
    public CommandLineRunner initRates(ObjectMapper objectMapper) {
        return args -> {
            if (rateRepository.count() == 0) {
                try (InputStream is = getClass().getClassLoader().getResourceAsStream("static/rates.json")) {
                    if (is == null) {
                        throw new IllegalArgumentException("Could not find static/rates.json in classpath.");
                    }

                    RatesWrapper wrapper = objectMapper.readValue(is, RatesWrapper.class);
                    rateRepository.saveAll(wrapper.getRates());
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        };
    }

    // Wrapper for outer "rates": [ ... ]
    @Setter
    @Getter
    public static class RatesWrapper {
        private List<Rate> rates;
    }
}
