package polsl.pl.tab.api.instructor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import polsl.pl.tab.api.instructor.model.InstructorAppointment;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Repository
public interface InstructorAppointmentRepository extends JpaRepository<InstructorAppointment, Integer> {
    long countByInstructorIdAndDayOfWeekAndStartTimeLessThanAndEndTimeGreaterThan(
            Integer instructorId, DayOfWeek dayOfWeek, LocalTime toTime, LocalTime fromTime);
}
