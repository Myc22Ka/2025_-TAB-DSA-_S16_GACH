package polsl.pl.tab.api.instructor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import polsl.pl.tab.api.instructor.model.Instructor;

public interface InstructorRepository extends JpaRepository<Instructor, Integer> {
}
