package polsl.pl.tab.api.instructor.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import polsl.pl.tab.api.instructor.dto.InstructorAvailabilityResponse;
import polsl.pl.tab.api.instructor.model.InstructorAvailability;
import polsl.pl.tab.api.instructor.repository.InstructorAppointmentRepository;
import polsl.pl.tab.api.instructor.repository.InstructorAvailabilityRepository;
import polsl.pl.tab.api.user.dto.InstructorDetails;
import polsl.pl.tab.api.user.model.User;
import polsl.pl.tab.api.user.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InstructorAvailabilityService {

    private final InstructorAvailabilityRepository availabilityRepository;
    private final UserRepository userRepository;
    private final InstructorAppointmentRepository appointmentRepository;

    public InstructorAvailabilityResponse getInstructorAvailability(Integer instructorId) {
        User user = userRepository.findById(instructorId)
                .orElseThrow(() -> new IllegalArgumentException("Instructor not found"));

        List<InstructorAvailability> availabilityList = availabilityRepository.findByInstructorId(instructorId);

        List<InstructorAvailabilityResponse.DayAvailability> dayAvailabilities = availabilityList.stream()
                .map(avail -> {
                    List<InstructorAvailabilityResponse.HourRange> hours = avail.getHours().stream()
                            .map(hour -> {
                                long bookedCount = appointmentRepository.countByInstructorIdAndDayOfWeekAndStartTimeLessThanAndEndTimeGreaterThan(
                                        instructorId,
                                        avail.getDayOfWeek(),
                                        hour.getToTime(),
                                        hour.getFromTime()
                                );

                                return new InstructorAvailabilityResponse.HourRange(
                                        hour.getFromTime(),
                                        hour.getToTime(),
                                        (int) bookedCount,
                                        hour.getMaxCount()
                                );
                            })
                            .collect(Collectors.toList());

                    return new InstructorAvailabilityResponse.DayAvailability(avail.getDayOfWeek(), hours);
                })
                .collect(Collectors.toList());

        InstructorDetails instructorDetails = InstructorDetails.fromEntity(user);

        return new InstructorAvailabilityResponse(instructorDetails, dayAvailabilities);
    }
}

