package polsl.pl.tab.api.activity.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import polsl.pl.tab.api.activity.dto.ActivityDetails;
import polsl.pl.tab.api.activity.service.ActivityService;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    @GetMapping
    public ResponseEntity<List<ActivityDetails>> getAllActivities() {
        return ResponseEntity.ok(activityService.getAllActivities());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActivityDetails> getActivityById(@PathVariable("id") Integer activityId) {
        return ResponseEntity.ok(activityService.getActivityById(activityId));
    }
}
