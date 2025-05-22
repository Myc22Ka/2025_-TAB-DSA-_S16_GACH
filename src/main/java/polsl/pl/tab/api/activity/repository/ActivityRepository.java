package polsl.pl.tab.api.activity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import polsl.pl.tab.api.activity.model.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Integer> {
}
