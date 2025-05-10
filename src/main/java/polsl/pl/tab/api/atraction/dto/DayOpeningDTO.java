package polsl.pl.tab.api.atraction.dto;

import java.time.DayOfWeek;
import java.util.List;

public record DayOpeningDTO(DayOfWeek dayOfWeek,
                            List<TimeRangeDTO> hours) {
}
