package polsl.pl.tab.api.instructor.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import polsl.pl.tab.api.instructor.dto.InstructorAppointmentRequest;
import polsl.pl.tab.api.instructor.service.InstructorAppointmentService;
import polsl.pl.tab.exception.SuccessResponse;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class InstructorAppointmentController {

    private final InstructorAppointmentService appointmentService;

    @PostMapping("/book")
    public ResponseEntity<SuccessResponse> bookAppointment(@RequestBody InstructorAppointmentRequest request, Authentication authentication) {
        appointmentService.bookAppointment(request, authentication);

        SuccessResponse response = new SuccessResponse(
                LocalDateTime.now().toString(),
                "Appointment booked successfully",
                200
        );

        return ResponseEntity.ok(response);
    }
}
