package polsl.pl.tab.api.atraction.initializer;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import polsl.pl.tab.api.atraction.dto.AttractionDetailsFull;
import polsl.pl.tab.api.atraction.model.Attraction;
import polsl.pl.tab.api.atraction.model.OpeningHour;
import polsl.pl.tab.api.atraction.repository.AttractionRepository;

import java.io.InputStream;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class AttractionInitializer {

    private final AttractionRepository attractionRepository;
    private final ObjectMapper objectMapper;

    @Bean
    public CommandLineRunner initAttractions() {
        return args -> {
            if (attractionRepository.count() == 0) {
                try (InputStream is = getClass().getClassLoader().getResourceAsStream("static/attractions.json")) {
                    if (is == null) {
                        throw new IllegalArgumentException("Could not find static/attractions.json");
                    }

                    List<AttractionDetailsFull> dtos = objectMapper.readValue(is, new TypeReference<>() {});

                    List<Attraction> attractions = dtos.stream()
                            .map(this::toAttraction)
                            .toList();

                    attractionRepository.saveAll(attractions);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        };
    }

    private Attraction toAttraction(AttractionDetailsFull dto) {
        Attraction attraction = new Attraction();
        attraction.setName(dto.name());
        attraction.setDescription(dto.description());
        attraction.setImageUrl(dto.imageUrl());
        attraction.setPrice(dto.price());
        attraction.setMaxPeopleAmount(dto.maxPeopleAmount());
        attraction.setCurrentPeopleAmount(dto.currentPeopleAmount());

        List<OpeningHour> openingHours = dto.openingDays().stream()
                .flatMap(dayOpening -> dayOpening.hours().stream()
                        .map(timeRange -> {
                            OpeningHour oh = new OpeningHour();
                            oh.setDayOfWeek(dayOpening.dayOfWeek());
                            oh.setOpeningTime(timeRange.from());
                            oh.setClosingTime(timeRange.to());
                            oh.setAttraction(attraction);
                            return oh;
                        })
                )
                .toList();

        attraction.setOpeningHours(openingHours);

        return attraction;
    }
}

