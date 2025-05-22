package polsl.pl.tab.api.instructor.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import polsl.pl.tab.api.instructor.dto.InstructorDetails;
import polsl.pl.tab.api.instructor.dto.InstructorDetails;
import polsl.pl.tab.api.instructor.service.InstructorService;

import java.util.List;

@RestController
@RequestMapping("/api/instructors")
@RequiredArgsConstructor
public class InstructorController {

    private final InstructorService instructorService;

    @GetMapping("/details")
    public ResponseEntity<List<InstructorDetails>> getInstructorDetails() {
        return ResponseEntity.ok(instructorService.getAllInstructors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InstructorDetails> getInstructorDetailsFull(@PathVariable("id") Integer instructorId) {
        InstructorDetails instructorDetails = instructorService.getInstructorById(instructorId);
        return ResponseEntity.ok(instructorDetails);
    }

}
