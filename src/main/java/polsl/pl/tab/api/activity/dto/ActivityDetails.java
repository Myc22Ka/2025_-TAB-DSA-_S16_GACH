package polsl.pl.tab.api.activity.dto;

import java.time.LocalDateTime;

public record ActivityDetails(
        LocalDateTime activityTime,
        Integer activityDuration,
        Integer entryLimit,
        String activityType,
        Integer available,
        Double price
) {}
