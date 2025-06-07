package polsl.pl.tab.api.atractionEntry.initializer;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import polsl.pl.tab.api.atractionEntry.dto.AtractionEntryDetails;
import polsl.pl.tab.api.atractionEntry.model.AtractionEntry;
import polsl.pl.tab.api.atractionEntry.repository.AtractionEntryRepository;

import java.io.InputStream;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class AtractionEntryInitializer {

    private final AtractionEntryRepository atractionEntryRepository;
    private final ObjectMapper objectMapper;

    @Bean
    public CommandLineRunner initAtractionEntries() {
        return args -> {
            if (atractionEntryRepository.count() == 0) {
                try (InputStream is = getClass().getClassLoader().getResourceAsStream("static/atractionentry.json")) {
                    if (is == null) {
                        throw new IllegalArgumentException("Could not find static/atractionEntries.json");
                    }

                    List<AtractionEntryDetails> dtos = objectMapper.readValue(is, new TypeReference<>() {});

                    List<AtractionEntry> entries = dtos.stream()
                            .map(this::toAtractionEntry)
                            .toList();

                    atractionEntryRepository.saveAll(entries);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        };
    }

    private AtractionEntry toAtractionEntry(AtractionEntryDetails dto) {
        AtractionEntry entry = new AtractionEntry();
        entry.setAtraction_id(dto.atraction_id());
        entry.setUser_id(dto.user_id());
        entry.setPeoplecount(dto.peoplecount());
        entry.setDuration(dto.duration());
        return entry;
    }
}
