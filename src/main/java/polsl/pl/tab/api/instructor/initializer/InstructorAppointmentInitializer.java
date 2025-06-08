package polsl.pl.tab.api.instructor.initializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import polsl.pl.tab.api.instructor.model.InstructorAppointment;
import polsl.pl.tab.api.instructor.repository.InstructorAppointmentRepository;
import polsl.pl.tab.api.user.model.User;
import polsl.pl.tab.api.user.repository.UserRepository;

import java.io.InputStream;
import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class InstructorAppointmentInitializer {

    private final UserRepository userRepository;
    private final InstructorAppointmentRepository appointmentRepository;

    @Bean
    @Order(5)
    public CommandLineRunner initInstructorAppointments(ObjectMapper objectMapper) {
        return args -> {
            System.out.println("[INIT] InstructorAppointmentInitializer");

            if (appointmentRepository.count() == 0) {
                try (InputStream is = getClass().getClassLoader().getResourceAsStream("static/instructor_appointments.json")) {
                    if (is == null) {
                        throw new IllegalArgumentException("Could not find static/instructor_appointments.json in classpath.");
                    }

                    AppointmentJsonWrapper[] appointments = objectMapper.readValue(is, AppointmentJsonWrapper[].class);
                    List<InstructorAppointment> appointmentList = new ArrayList<>();

                    for (AppointmentJsonWrapper apptJson : appointments) {
                        User instructor = userRepository.findById(apptJson.getInstructorId())
                                .orElseThrow(() -> new IllegalStateException("Instructor with id " + apptJson.getInstructorId() + " not found"));
                        User user = userRepository.findById(apptJson.getUserId())
                                .orElseThrow(() -> new IllegalStateException("User with id " + apptJson.getUserId() + " not found"));

                        InstructorAppointment appointment = new InstructorAppointment();
                        appointment.setInstructor(instructor);
                        appointment.setUser(user);
                        appointment.setDayOfWeek(DayOfWeek.valueOf(apptJson.getDayOfWeek()));
                        appointment.setStartTime(LocalTime.parse(apptJson.getStartTime()));
                        appointment.setEndTime(LocalTime.parse(apptJson.getEndTime()));

                        appointmentList.add(appointment);
                    }

                    appointmentRepository.saveAll(appointmentList);
                }
            }
        };
    }

    @Getter
    @Setter
    public static class AppointmentJsonWrapper {
        private Integer instructorId;
        private Integer userId;
        private String dayOfWeek;
        private String startTime;
        private String endTime;
    }
}

