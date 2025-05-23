package polsl.pl.tab.api.atraction.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import polsl.pl.tab.api.atraction.dto.*;
import polsl.pl.tab.api.atraction.model.Attraction;
import polsl.pl.tab.api.atraction.model.OpeningHour;
import polsl.pl.tab.api.atraction.repository.AttractionRepository;
import polsl.pl.tab.api.atraction.repository.OpeningHourRepository;
import polsl.pl.tab.exception.AppException;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttractionService {

    private final AttractionRepository attractionRepository;
    private final OpeningHourRepository openingHourRepository;

    public List<AttractionDetails> getAttractionDetails() {
        return attractionRepository.findAll()
                .stream()
                .map(attraction -> new AttractionDetails(
                        attraction.getName(),
                        attraction.getDescription(),
                        attraction.getImageUrl(),
                        attraction.getPrice(),
                        attraction.getMaxPeopleAmount(),
                        attraction.getCurrentPeopleAmount()
                ))
                .toList();
    }

    public List<OpeningHourDTO> getAllAttractionsWithOpeningDays() {
        List<Attraction> attractions = attractionRepository.findAll();

        return attractions.stream().map(attraction -> {
            Map<DayOfWeek, List<OpeningHour>> groupedByDay = attraction.getOpeningHours().stream()
                    .collect(Collectors.groupingBy(OpeningHour::getDayOfWeek));

            List<DayOpeningDTO> openingDays = groupedByDay.entrySet().stream()
                    .map(entry -> {
                        List<TimeRangeDTO> hours = entry.getValue().stream()
                                .map(oh -> new TimeRangeDTO(oh.getOpeningTime(), oh.getClosingTime()))
                                .toList();

                        return new DayOpeningDTO(entry.getKey(), hours);
                    })
                    .toList();

            return new OpeningHourDTO(attraction.getName(), openingDays);
        }).toList();
    }

    public AttractionDetailsFull getAttractionDetails(Integer attractionId) {
        Attraction attraction = attractionRepository.findById(attractionId)
                .orElseThrow(() -> new AppException("Attraction not found with id: " + attractionId));

        Map<DayOfWeek, List<OpeningHour>> groupedByDay = attraction.getOpeningHours().stream()
                .collect(Collectors.groupingBy(OpeningHour::getDayOfWeek));

        List<DayOpeningDTO> openingDays = groupedByDay.entrySet().stream()
                .map(entry -> {
                    List<TimeRangeDTO> hours = entry.getValue().stream()
                            .map(oh -> new TimeRangeDTO(oh.getOpeningTime(), oh.getClosingTime()))
                            .toList();
                    return new DayOpeningDTO(entry.getKey(), hours);
                })
                .toList();

        return new AttractionDetailsFull(
                attraction.getName(),
                attraction.getDescription(),
                attraction.getImageUrl(),
                attraction.getMaxPeopleAmount(),
                attraction.getCurrentPeopleAmount(),
                attraction.getPrice(),
                openingDays
        );
    }
}