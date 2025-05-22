package polsl.pl.tab.api.instructor.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import polsl.pl.tab.api.instructor.dto.InstructorDetails;
import polsl.pl.tab.api.instructor.dto.InstructorDetails;
import polsl.pl.tab.api.instructor.model.Instructor;
import polsl.pl.tab.api.instructor.repository.InstructorRepository;
import polsl.pl.tab.exception.AppException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InstructorService {

    private final InstructorRepository instructorRepository;

    // Lista wszystkich instruktorów w wersji uproszczonej
    public List<InstructorDetails> getAllInstructors() {
        return instructorRepository.findAll()
                .stream()
                .map(i -> new InstructorDetails(
                        i.getLogin(),
                        i.getFirstname(),
                        i.getLastname(),
                        i.getAccesscode()
                ))
                .toList();
    }

    // Szczegóły pojedynczego instruktora z accesscodem
    public InstructorDetails getInstructorById(Integer id) {
        Instructor instructor = instructorRepository.findById(id)
                .orElseThrow(() -> new AppException("Instructor not found with id: " + id));

        return new InstructorDetails(
                instructor.getLogin(),
                instructor.getFirstname(),
                instructor.getLastname(),
                instructor.getAccesscode()
        );
    }
}
