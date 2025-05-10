package polsl.pl.tab.api.atraction.dto;

import java.util.List;

public record OpeningHourDTO(String name, List<DayOpeningDTO> openingDays) {}
