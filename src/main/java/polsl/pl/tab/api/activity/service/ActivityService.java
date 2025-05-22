package polsl.pl.tab.api.activity.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import polsl.pl.tab.api.activity.dto.ActivityDetails;
import polsl.pl.tab.api.activity.model.Activity;
import polsl.pl.tab.api.activity.repository.ActivityRepository;
import polsl.pl.tab.exception.AppException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;

    // Zwraca wszystkie aktywności jako DTO
    public List<ActivityDetails> getAllActivities() {
        return activityRepository.findAll()
                .stream()
                .map(activity -> new ActivityDetails(
                        activity.getActivityTime(),
                        activity.getActivityDuration(),
                        activity.getEntryLimit(),
                        activity.getActivityType(),
                        activity.getAvailable(),
                        activity.getPrice()
                ))
                .toList();
    }

    // Zwraca szczegóły jednej aktywności po ID
    public ActivityDetails getActivityById(Integer id) {
        Activity activity = activityRepository.findById(id)
                .orElseThrow(() -> new AppException("Activity not found with id: " + id));

        return new ActivityDetails(
                activity.getActivityTime(),
                activity.getActivityDuration(),
                activity.getEntryLimit(),
                activity.getActivityType(),
                activity.getAvailable(),
                activity.getPrice()
        );
    }
}
