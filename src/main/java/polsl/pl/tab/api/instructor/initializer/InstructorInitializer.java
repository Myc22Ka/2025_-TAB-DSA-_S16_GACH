package polsl.pl.tab.api.instructor.initializer;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import polsl.pl.tab.api.instructor.dto.InstructorDetails;
import polsl.pl.tab.api.instructor.model.Instructor;
import polsl.pl.tab.api.instructor.repository.InstructorRepository;

import java.io.InputStream;
import java.util.List;

//@Configuration
//@RequiredArgsConstructor
//public class InstructorInitializer {
//
////    private final InstructorRepository instructorRepository;
////
////    @Bean
////    public CommandLineRunner initInstructors(ObjectMapper objectMapper) {
////        return args -> {
////            if (instructorRepository.count() == 0) {
////                try (InputStream is = getClass().getClassLoader().getResourceAsStream("static/instructors.json")) {
////                    if (is == null) {
////                        throw new IllegalArgumentException("Could not find static/instructors.json in classpath.");
////                    }
////
////                    InstructorsWrapper wrapper = objectMapper.readValue(is, InstructorsWrapper.class);
////                    instructorRepository.saveAll(wrapper.getInstructor());
////                } catch (Exception e) {
////                    e.printStackTrace();
////                }
////            }
////        };
////    }
////
////    @Getter
////    @Setter
////    public static class InstructorsWrapper {
////        private List<Instructor> instructor;
////    }
//}

@Configuration
@RequiredArgsConstructor
public class InstructorInitializer {

    private final InstructorRepository instructorRepository;
    private final ObjectMapper objectMapper;

    @Bean
    public CommandLineRunner initInstructors() {
        return args -> {
            if (instructorRepository.count() == 0) {
                try (InputStream is = getClass().getClassLoader().getResourceAsStream("static/instructor.json")) {
                    if (is == null) {
                        throw new IllegalArgumentException("Could not find static/instructors.json");
                    }

                    List<InstructorDetails> dtos = objectMapper.readValue(is, new TypeReference<>() {});

                    List<Instructor> instructors = dtos.stream()
                            .map(this::toInstructor)
                            .toList();

                    instructorRepository.saveAll(instructors);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        };
    }

    private Instructor toInstructor(InstructorDetails dto) {
        Instructor instructor = new Instructor();
        instructor.setLogin(dto.login());
        instructor.setFirstname(dto.firstname());
        instructor.setLastname(dto.lastname());
        instructor.setAccesscode(dto.accesscode());
        return instructor;
    }
}