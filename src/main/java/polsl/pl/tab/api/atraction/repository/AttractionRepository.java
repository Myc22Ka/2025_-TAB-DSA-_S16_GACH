package polsl.pl.tab.api.atraction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import polsl.pl.tab.api.atraction.model.Attraction;

public interface AttractionRepository extends JpaRepository<Attraction, Integer> {
}
