package polsl.pl.tab.api.instructor.dto;

import polsl.pl.tab.api.instructor.model.InstructorAppointment;
import polsl.pl.tab.api.user.dto.UserDto;

import java.time.LocalTime;

public record UserAppointmentDto(
        UserDto user,
        LocalTime startTime,
        LocalTime endTime,
        Integer appointmentId
) {
    public static UserAppointmentDto fromEntity(InstructorAppointment appointment) {
        return new UserAppointmentDto(
                UserDto.fromEntity(appointment.getUser()),
                appointment.getStartTime(),
                appointment.getEndTime(),
                appointment.getId()
        );
    }
}
