package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.CheckInCount;
import io.github.jhipster.application.repository.CheckInCountRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CheckInCount.
 */
@RestController
@RequestMapping("/api")
public class CheckInCountResource {

    private final Logger log = LoggerFactory.getLogger(CheckInCountResource.class);

    private static final String ENTITY_NAME = "checkInCount";

    private final CheckInCountRepository checkInCountRepository;

    public CheckInCountResource(CheckInCountRepository checkInCountRepository) {
        this.checkInCountRepository = checkInCountRepository;
    }

    /**
     * POST  /check-in-counts : Create a new checkInCount.
     *
     * @param checkInCount the checkInCount to create
     * @return the ResponseEntity with status 201 (Created) and with body the new checkInCount, or with status 400 (Bad Request) if the checkInCount has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/check-in-counts")
    @Timed
    public ResponseEntity<CheckInCount> createCheckInCount(@RequestBody CheckInCount checkInCount) throws URISyntaxException {
        log.debug("REST request to save CheckInCount : {}", checkInCount);
        if (checkInCount.getId() != null) {
            throw new BadRequestAlertException("A new checkInCount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CheckInCount result = checkInCountRepository.save(checkInCount);
        return ResponseEntity.created(new URI("/api/check-in-counts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /check-in-counts : Updates an existing checkInCount.
     *
     * @param checkInCount the checkInCount to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated checkInCount,
     * or with status 400 (Bad Request) if the checkInCount is not valid,
     * or with status 500 (Internal Server Error) if the checkInCount couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/check-in-counts")
    @Timed
    public ResponseEntity<CheckInCount> updateCheckInCount(@RequestBody CheckInCount checkInCount) throws URISyntaxException {
        log.debug("REST request to update CheckInCount : {}", checkInCount);
        if (checkInCount.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CheckInCount result = checkInCountRepository.save(checkInCount);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, checkInCount.getId().toString()))
            .body(result);
    }

    /**
     * GET  /check-in-counts : get all the checkInCounts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of checkInCounts in body
     */
    @GetMapping("/check-in-counts")
    @Timed
    public List<CheckInCount> getAllCheckInCounts() {
        log.debug("REST request to get all CheckInCounts");
        return checkInCountRepository.findAll();
    }

    /**
     * GET  /check-in-counts/:id : get the "id" checkInCount.
     *
     * @param id the id of the checkInCount to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the checkInCount, or with status 404 (Not Found)
     */
    @GetMapping("/check-in-counts/{id}")
    @Timed
    public ResponseEntity<CheckInCount> getCheckInCount(@PathVariable Long id) {
        log.debug("REST request to get CheckInCount : {}", id);
        Optional<CheckInCount> checkInCount = checkInCountRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(checkInCount);
    }

    /**
     * DELETE  /check-in-counts/:id : delete the "id" checkInCount.
     *
     * @param id the id of the checkInCount to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/check-in-counts/{id}")
    @Timed
    public ResponseEntity<Void> deleteCheckInCount(@PathVariable Long id) {
        log.debug("REST request to delete CheckInCount : {}", id);

        checkInCountRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
