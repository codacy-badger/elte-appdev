package hu.elte.assignment.data.repository.theatre;

import hu.elte.assignment.data.model.theatre.Screening;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScreeningRepository extends CrudRepository<Screening, Integer> {
}
