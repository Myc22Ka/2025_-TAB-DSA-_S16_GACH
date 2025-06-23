package polsl.pl.tab.api.instructor.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import polsl.pl.tab.api.instructor.dto.InstructorAvailabilityResponse;
import polsl.pl.tab.api.instructor.service.InstructorAvailabilityService;

@RestController
@RequestMapping("/api/users/instructors")
@RequiredArgsConstructor
public class InstructorAvailabilityController {

    private final InstructorAvailabilityService availabilityService;

    @GetMapping("/{instructorId}/availability")
    public ResponseEntity<InstructorAvailabilityResponse> getAvailability(@PathVariable Integer instructorId) {
        InstructorAvailabilityResponse response = availabilityService.getInstructorAvailability(instructorId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me/availability")
    public ResponseEntity<InstructorAvailabilityResponse> getMyAvailability(Authentication authentication) {
        var response = availabilityService.getOwnAvailability(authentication);
        return ResponseEntity.ok(response);
    }
}
