package polsl.pl.tab.api.user.dto;

import lombok.Data;
import polsl.pl.tab.api.instructor.model.InstructorAppointment;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Data
public class UserAppointmentDto {
    private String instructorName;
    private DayOfWeek dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;

    public static UserAppointmentDto fromEntity(InstructorAppointment appointment) {
        UserAppointmentDto dto = new UserAppointmentDto();
        dto.setInstructorName(appointment.getInstructor().getFirstname() + " " + appointment.getInstructor().getLastname());
        dto.setDayOfWeek(appointment.getDayOfWeek());
        dto.setStartTime(appointment.getStartTime());
        dto.setEndTime(appointment.getEndTime());
        return dto;
    }
}
