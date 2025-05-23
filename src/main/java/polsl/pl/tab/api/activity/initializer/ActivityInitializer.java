package polsl.pl.tab.api.activity.initializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import polsl.pl.tab.api.activity.model.Activity;
import polsl.pl.tab.api.activity.repository.ActivityRepository;

import java.io.InputStream;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class ActivityInitializer {

//    private final ActivityRepository activityRepository;
//
//    @Bean
//    public CommandLineRunner initActivities(ObjectMapper objectMapper) {
//        return args -> {
//            if (activityRepository.count() == 0) {
//                try (InputStream is = getClass().getClassLoader().getResourceAsStream("static/activities.json")) {
//                    if (is == null) {
//                        throw new IllegalArgumentException("Could not find static/activities.json in classpath.");
//                    }
//
//                    ActivitiesWrapper wrapper = objectMapper.readValue(is, ActivitiesWrapper.class);
//                    activityRepository.saveAll(wrapper.getActivity());
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }
//            }
//        };
//    }
//
//    // Wrapper for outer "activity": [ ... ]
//    @Setter
//    @Getter
//    public static class ActivitiesWrapper {
//        private List<Activity> activity;
//    }
}
