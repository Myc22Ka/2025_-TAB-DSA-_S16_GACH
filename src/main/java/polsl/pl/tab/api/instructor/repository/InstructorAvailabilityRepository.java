package polsl.pl.tab.api.instructor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import polsl.pl.tab.api.instructor.model.InstructorAvailability;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Optional;

@Repository
public interface InstructorAvailabilityRepository extends JpaRepository<InstructorAvailability, Integer> {
    List<InstructorAvailability> findByInstructorId(Integer instructorId);

    Optional<InstructorAvailability> findByInstructorIdAndDayOfWeek(Integer integer, DayOfWeek dayOfWeek);
}
