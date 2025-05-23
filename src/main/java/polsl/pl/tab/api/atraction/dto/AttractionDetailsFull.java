package polsl.pl.tab.api.atraction.dto;

import java.util.List;

public record AttractionDetailsFull(
        String name,
        String description,
        String imageUrl,
        Integer maxPeopleAmount,
        Integer currentPeopleAmount,
        Double price,
        List<DayOpeningDTO> openingDays) {
}
