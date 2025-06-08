package polsl.pl.tab.api.instructor.dto;

import java.time.DayOfWeek;
import java.time.LocalTime;

public record InstructorAppointmentRequest(
        Integer instructorId,
        DayOfWeek dayOfWeek,
        LocalTime startTime,
        LocalTime endTime
) {}
