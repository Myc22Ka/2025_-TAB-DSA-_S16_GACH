package polsl.pl.tab.api.atraction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import polsl.pl.tab.api.atraction.model.Rate;

import java.util.List;

public interface RateRepository extends JpaRepository<Rate, Integer> {
    List<Rate> findByAttractionId(Integer attractionId);
}