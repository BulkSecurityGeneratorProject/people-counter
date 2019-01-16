package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.PeoplecounterApp;

import io.github.jhipster.application.domain.CheckInCount;
import io.github.jhipster.application.repository.CheckInCountRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.sameInstant;
import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CheckInCountResource REST controller.
 *
 * @see CheckInCountResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PeoplecounterApp.class)
public class CheckInCountResourceIntTest {

    private static final Integer DEFAULT_PERSON_IN = 1;
    private static final Integer UPDATED_PERSON_IN = 2;

    private static final Integer DEFAULT_PERSONOUT = 1;
    private static final Integer UPDATED_PERSONOUT = 2;

    private static final ZonedDateTime DEFAULT_COUNT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_COUNT_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private CheckInCountRepository checkInCountRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCheckInCountMockMvc;

    private CheckInCount checkInCount;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CheckInCountResource checkInCountResource = new CheckInCountResource(checkInCountRepository);
        this.restCheckInCountMockMvc = MockMvcBuilders.standaloneSetup(checkInCountResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CheckInCount createEntity(EntityManager em) {
        CheckInCount checkInCount = new CheckInCount()
            .personIn(DEFAULT_PERSON_IN)
            .personout(DEFAULT_PERSONOUT)
            .countDate(DEFAULT_COUNT_DATE);
        return checkInCount;
    }

    @Before
    public void initTest() {
        checkInCount = createEntity(em);
    }

    @Test
    @Transactional
    public void createCheckInCount() throws Exception {
        int databaseSizeBeforeCreate = checkInCountRepository.findAll().size();

        // Create the CheckInCount
        restCheckInCountMockMvc.perform(post("/api/check-in-counts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(checkInCount)))
            .andExpect(status().isCreated());

        // Validate the CheckInCount in the database
        List<CheckInCount> checkInCountList = checkInCountRepository.findAll();
        assertThat(checkInCountList).hasSize(databaseSizeBeforeCreate + 1);
        CheckInCount testCheckInCount = checkInCountList.get(checkInCountList.size() - 1);
        assertThat(testCheckInCount.getPersonIn()).isEqualTo(DEFAULT_PERSON_IN);
        assertThat(testCheckInCount.getPersonout()).isEqualTo(DEFAULT_PERSONOUT);
        assertThat(testCheckInCount.getCountDate()).isEqualTo(DEFAULT_COUNT_DATE);
    }

    @Test
    @Transactional
    public void createCheckInCountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = checkInCountRepository.findAll().size();

        // Create the CheckInCount with an existing ID
        checkInCount.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCheckInCountMockMvc.perform(post("/api/check-in-counts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(checkInCount)))
            .andExpect(status().isBadRequest());

        // Validate the CheckInCount in the database
        List<CheckInCount> checkInCountList = checkInCountRepository.findAll();
        assertThat(checkInCountList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCheckInCounts() throws Exception {
        // Initialize the database
        checkInCountRepository.saveAndFlush(checkInCount);

        // Get all the checkInCountList
        restCheckInCountMockMvc.perform(get("/api/check-in-counts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(checkInCount.getId().intValue())))
            .andExpect(jsonPath("$.[*].personIn").value(hasItem(DEFAULT_PERSON_IN)))
            .andExpect(jsonPath("$.[*].personout").value(hasItem(DEFAULT_PERSONOUT)))
            .andExpect(jsonPath("$.[*].countDate").value(hasItem(sameInstant(DEFAULT_COUNT_DATE))));
    }
    
    @Test
    @Transactional
    public void getCheckInCount() throws Exception {
        // Initialize the database
        checkInCountRepository.saveAndFlush(checkInCount);

        // Get the checkInCount
        restCheckInCountMockMvc.perform(get("/api/check-in-counts/{id}", checkInCount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(checkInCount.getId().intValue()))
            .andExpect(jsonPath("$.personIn").value(DEFAULT_PERSON_IN))
            .andExpect(jsonPath("$.personout").value(DEFAULT_PERSONOUT))
            .andExpect(jsonPath("$.countDate").value(sameInstant(DEFAULT_COUNT_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingCheckInCount() throws Exception {
        // Get the checkInCount
        restCheckInCountMockMvc.perform(get("/api/check-in-counts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCheckInCount() throws Exception {
        // Initialize the database
        checkInCountRepository.saveAndFlush(checkInCount);

        int databaseSizeBeforeUpdate = checkInCountRepository.findAll().size();

        // Update the checkInCount
        CheckInCount updatedCheckInCount = checkInCountRepository.findById(checkInCount.getId()).get();
        // Disconnect from session so that the updates on updatedCheckInCount are not directly saved in db
        em.detach(updatedCheckInCount);
        updatedCheckInCount
            .personIn(UPDATED_PERSON_IN)
            .personout(UPDATED_PERSONOUT)
            .countDate(UPDATED_COUNT_DATE);

        restCheckInCountMockMvc.perform(put("/api/check-in-counts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCheckInCount)))
            .andExpect(status().isOk());

        // Validate the CheckInCount in the database
        List<CheckInCount> checkInCountList = checkInCountRepository.findAll();
        assertThat(checkInCountList).hasSize(databaseSizeBeforeUpdate);
        CheckInCount testCheckInCount = checkInCountList.get(checkInCountList.size() - 1);
        assertThat(testCheckInCount.getPersonIn()).isEqualTo(UPDATED_PERSON_IN);
        assertThat(testCheckInCount.getPersonout()).isEqualTo(UPDATED_PERSONOUT);
        assertThat(testCheckInCount.getCountDate()).isEqualTo(UPDATED_COUNT_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingCheckInCount() throws Exception {
        int databaseSizeBeforeUpdate = checkInCountRepository.findAll().size();

        // Create the CheckInCount

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCheckInCountMockMvc.perform(put("/api/check-in-counts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(checkInCount)))
            .andExpect(status().isBadRequest());

        // Validate the CheckInCount in the database
        List<CheckInCount> checkInCountList = checkInCountRepository.findAll();
        assertThat(checkInCountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCheckInCount() throws Exception {
        // Initialize the database
        checkInCountRepository.saveAndFlush(checkInCount);

        int databaseSizeBeforeDelete = checkInCountRepository.findAll().size();

        // Get the checkInCount
        restCheckInCountMockMvc.perform(delete("/api/check-in-counts/{id}", checkInCount.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CheckInCount> checkInCountList = checkInCountRepository.findAll();
        assertThat(checkInCountList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CheckInCount.class);
        CheckInCount checkInCount1 = new CheckInCount();
        checkInCount1.setId(1L);
        CheckInCount checkInCount2 = new CheckInCount();
        checkInCount2.setId(checkInCount1.getId());
        assertThat(checkInCount1).isEqualTo(checkInCount2);
        checkInCount2.setId(2L);
        assertThat(checkInCount1).isNotEqualTo(checkInCount2);
        checkInCount1.setId(null);
        assertThat(checkInCount1).isNotEqualTo(checkInCount2);
    }
}
