package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A CheckInCount.
 */
@Entity
@Table(name = "check_in_count")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CheckInCount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "person_in")
    private Integer personIn;

    @Column(name = "personout")
    private Integer personout;

    @Column(name = "count_date")
    private ZonedDateTime countDate;

    @ManyToOne
    @JsonIgnoreProperties("checkInCounts")
    private Store store;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPersonIn() {
        return personIn;
    }

    public CheckInCount personIn(Integer personIn) {
        this.personIn = personIn;
        return this;
    }

    public void setPersonIn(Integer personIn) {
        this.personIn = personIn;
    }

    public Integer getPersonout() {
        return personout;
    }

    public CheckInCount personout(Integer personout) {
        this.personout = personout;
        return this;
    }

    public void setPersonout(Integer personout) {
        this.personout = personout;
    }

    public ZonedDateTime getCountDate() {
        return countDate;
    }

    public CheckInCount countDate(ZonedDateTime countDate) {
        this.countDate = countDate;
        return this;
    }

    public void setCountDate(ZonedDateTime countDate) {
        this.countDate = countDate;
    }

    public Store getStore() {
        return store;
    }

    public CheckInCount store(Store store) {
        this.store = store;
        return this;
    }

    public void setStore(Store store) {
        this.store = store;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CheckInCount checkInCount = (CheckInCount) o;
        if (checkInCount.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), checkInCount.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CheckInCount{" +
            "id=" + getId() +
            ", personIn=" + getPersonIn() +
            ", personout=" + getPersonout() +
            ", countDate='" + getCountDate() + "'" +
            "}";
    }
}
