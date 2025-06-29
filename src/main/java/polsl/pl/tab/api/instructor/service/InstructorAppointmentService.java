package polsl.pl.tab.api.instructor.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import polsl.pl.tab.api.instructor.dto.InstructorAppointmentRequest;
import polsl.pl.tab.api.instructor.dto.UserAppointmentDto;
import polsl.pl.tab.api.instructor.model.InstructorAppointment;
import polsl.pl.tab.api.instructor.model.InstructorAvailability;
import polsl.pl.tab.api.instructor.model.InstructorAvailabilityHour;
import polsl.pl.tab.api.instructor.repository.InstructorAppointmentRepository;
import polsl.pl.tab.api.instructor.repository.InstructorAvailabilityRepository;
import polsl.pl.tab.api.user.model.Role;
import polsl.pl.tab.api.user.model.User;
import polsl.pl.tab.api.user.repository.UserRepository;
import polsl.pl.tab.exception.AppException;

import java.time.DayOfWeek;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InstructorAppointmentService {

    private final InstructorAppointmentRepository appointmentRepository;
    private final InstructorAvailabilityRepository availabilityRepository;
    private final UserRepository userRepository;

    public void bookAppointment(InstructorAppointmentRequest request, Authentication authentication) {
        User instructor = userRepository.findById(request.instructorId())
                .orElseThrow(() -> new IllegalArgumentException("Instructor not found"));

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        InstructorAvailability availability = availabilityRepository.findByInstructorIdAndDayOfWeek(request.instructorId(), request.dayOfWeek())
                .orElseThrow(() -> new IllegalArgumentException("No availability found for this instructor on the specified day"));

        InstructorAvailabilityHour matchingHour = availability.getHours().stream()
                .filter(hour ->
                        !hour.getFromTime().isAfter(request.startTime()) &&
                                !hour.getToTime().isBefore(request.endTime()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("No availability hour matches the requested time"));

        long bookedCount = appointmentRepository.countByInstructorIdAndDayOfWeekAndStartTimeLessThanAndEndTimeGreaterThan(
                request.instructorId(),
                request.dayOfWeek(),
                request.endTime(),
                request.startTime()
        );

        if (bookedCount >= matchingHour.getMaxCount()) {
            throw new IllegalStateException("No free spots available for the selected time slot");
        }

        boolean userAlreadyBooked = appointmentRepository.existsByUserIdAndInstructorIdAndDayOfWeekAndStartTimeLessThanAndEndTimeGreaterThan(
                user.getId(),
                instructor.getId(),
                request.dayOfWeek(),
                request.endTime(),
                request.startTime()
        );

        if (userAlreadyBooked) {
            throw new IllegalStateException("You have already booked an appointment during this time slot");
        }

        InstructorAppointment appointment = new InstructorAppointment();
        appointment.setInstructor(instructor);
        appointment.setUser(user);
        appointment.setDayOfWeek(request.dayOfWeek());
        appointment.setStartTime(request.startTime());
        appointment.setEndTime(request.endTime());

        appointmentRepository.save(appointment);
    }

    @Transactional(readOnly = true)
    public List<UserAppointmentDto> getUsersForDay(DayOfWeek day, Authentication authentication) {
        String email = authentication.getName();

        User instructor = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if(instructor.getRole() != Role.INSTRUCTOR) {
            throw new AppException("You need to be an instructor to be able to see users");
        }

        List<InstructorAppointment> appointments = appointmentRepository.findByDayOfWeek(day);

        return appointments.stream()
                .map(UserAppointmentDto::fromEntity)
                .toList();
    }

    @Transactional
    public void kickUserFromAppointment(String userEmail, Authentication authentication) {
        var user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String requesterEmail = authentication.getName();
        User instructor = userRepository.findByEmail(requesterEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if(instructor.getRole() != Role.INSTRUCTOR) {
            throw new AppException("You need to be an instructor to be able to remove users");
        }

        appointmentRepository.deleteById(user.getId());
    }
}
