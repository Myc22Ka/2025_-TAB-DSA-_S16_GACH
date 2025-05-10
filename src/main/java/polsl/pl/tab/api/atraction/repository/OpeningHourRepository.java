package polsl.pl.tab.api.atraction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import polsl.pl.tab.api.atraction.model.OpeningHour;

import java.util.List;

public interface OpeningHourRepository extends JpaRepository<OpeningHour, Integer> {
    List<OpeningHour> findByAttractionId(Integer attractionId);
}
