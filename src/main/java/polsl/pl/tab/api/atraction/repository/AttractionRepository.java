package polsl.pl.tab.api.atraction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import polsl.pl.tab.api.atraction.model.Attraction;

import java.util.Optional;

public interface AttractionRepository extends JpaRepository<Attraction, Integer> {
    Optional<Attraction> findByName(String name);
}
