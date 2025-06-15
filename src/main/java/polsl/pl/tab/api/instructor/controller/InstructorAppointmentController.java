package polsl.pl.tab.api.instructor.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import polsl.pl.tab.api.instructor.dto.InstructorAppointmentRequest;
import polsl.pl.tab.api.instructor.dto.UserAppointmentDto;
import polsl.pl.tab.api.instructor.service.InstructorAppointmentService;
import polsl.pl.tab.api.user.dto.UserDto;
import polsl.pl.tab.exception.SuccessResponse;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.List;

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

    @GetMapping("/users")
    public List<UserAppointmentDto> usersByDay(
            @RequestParam DayOfWeek day, Authentication authentication) {
        return appointmentService.getUsersForDay(day, authentication);
    }

    @DeleteMapping("/{appointmentId}/kick")
    public ResponseEntity<SuccessResponse> kickUserFromAppointment(
            @RequestParam String userEmail,
            Authentication authentication) {
        appointmentService.kickUserFromAppointment(userEmail, authentication);

        SuccessResponse response = new SuccessResponse(
                LocalDateTime.now().toString(),
                "Removed user successfully",
                200
        );

        return ResponseEntity.ok(response);
    }
}
