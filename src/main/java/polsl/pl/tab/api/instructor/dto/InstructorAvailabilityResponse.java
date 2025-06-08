package polsl.pl.tab.api.instructor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import polsl.pl.tab.api.user.dto.InstructorDetails;

import java.time.LocalTime;
import java.time.DayOfWeek;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InstructorAvailabilityResponse {
    private InstructorDetails instructor;
    private List<DayAvailability> availability;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DayAvailability {
        private DayOfWeek dayOfWeek;
        private List<HourRange> hours;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class HourRange {
        private LocalTime fromTime;
        private LocalTime toTime;
        private int bookedCount;
        private int maxCount;
    }
}

