package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.CheckInCount;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CheckInCount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CheckInCountRepository extends JpaRepository<CheckInCount, Long> {

}
