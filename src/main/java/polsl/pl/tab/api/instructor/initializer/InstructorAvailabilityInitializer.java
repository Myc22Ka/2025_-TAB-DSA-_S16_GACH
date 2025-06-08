package polsl.pl.tab.api.instructor.initializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import polsl.pl.tab.api.instructor.model.InstructorAvailability;
import polsl.pl.tab.api.instructor.model.InstructorAvailabilityHour;
import polsl.pl.tab.api.user.model.User;
import polsl.pl.tab.api.user.repository.UserRepository;
import polsl.pl.tab.api.instructor.repository.InstructorAvailabilityRepository;

import java.io.InputStream;
import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class InstructorAvailabilityInitializer {

    private final UserRepository userRepository;
    private final InstructorAvailabilityRepository availabilityRepository;

    @Bean
    @Order(4)
    public CommandLineRunner initInstructorAvailability(ObjectMapper objectMapper) {
        return args -> {
            System.out.println("[INIT] InstructorAvailabilityInitializer");

            if (availabilityRepository.count() == 0) {
                User instructor = userRepository.findById(27)
                        .orElseThrow(() -> new IllegalStateException("User with id 27 not found"));

                try (InputStream is = getClass().getClassLoader().getResourceAsStream("static/instructor_availability.json")) {
                    if (is == null) {
                        throw new IllegalArgumentException("Could not find static/instructor_availability.json in classpath.");
                    }

                    InstructorAvailabilityJsonWrapper iaJson = objectMapper.readValue(is, InstructorAvailabilityJsonWrapper.class);

                    List<InstructorAvailability> availabilityList = new ArrayList<>();

                    for (AvailabilityDay day : iaJson.getAvailability()) {
                        InstructorAvailability instructorAvailability = new InstructorAvailability();
                        instructorAvailability.setInstructor(instructor);
                        instructorAvailability.setDayOfWeek(DayOfWeek.valueOf(day.getDayOfWeek()));

                        List<InstructorAvailabilityHour> hoursList = new ArrayList<>();
                        for (HourRange hr : day.getHours()) {
                            InstructorAvailabilityHour hour = new InstructorAvailabilityHour();
                            hour.setFromTime(LocalTime.parse(hr.getFromTime()));
                            hour.setToTime(LocalTime.parse(hr.getToTime()));
                            hour.setMaxCount(hr.getMaxCount());
                            hour.setAvailability(instructorAvailability);
                            hoursList.add(hour);
                        }

                        instructorAvailability.setHours(hoursList);
                        availabilityList.add(instructorAvailability);
                    }

                    availabilityRepository.saveAll(availabilityList);
                }
            }
        };
    }

    // Wrapper odpowiadający strukturze JSON
    @Getter
    @Setter
    public static class InstructorAvailabilityJsonWrapper {
        private List<AvailabilityDay> availability;
    }

    @Getter
    @Setter
    public static class AvailabilityDay {
        private String dayOfWeek;
        private List<HourRange> hours;
    }

    @Getter
    @Setter
    public static class HourRange {
        private String fromTime;
        private String toTime;
        private int maxCount;
    }
}