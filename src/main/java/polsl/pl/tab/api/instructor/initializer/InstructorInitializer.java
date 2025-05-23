package polsl.pl.tab.api.instructor.initializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import polsl.pl.tab.api.instructor.model.Instructor;
import polsl.pl.tab.api.instructor.repository.InstructorRepository;

import java.io.InputStream;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class InstructorInitializer {

//    private final InstructorRepository instructorRepository;
//
//    @Bean
//    public CommandLineRunner initInstructors(ObjectMapper objectMapper) {
//        return args -> {
//            if (instructorRepository.count() == 0) {
//                try (InputStream is = getClass().getClassLoader().getResourceAsStream("static/instructors.json")) {
//                    if (is == null) {
//                        throw new IllegalArgumentException("Could not find static/instructors.json in classpath.");
//                    }
//
//                    InstructorsWrapper wrapper = objectMapper.readValue(is, InstructorsWrapper.class);
//                    instructorRepository.saveAll(wrapper.getInstructor());
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }
//            }
//        };
//    }
//
//    @Getter
//    @Setter
//    public static class InstructorsWrapper {
//        private List<Instructor> instructor;
//    }
}
