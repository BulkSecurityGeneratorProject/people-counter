/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PeoplecounterTestModule } from '../../../test.module';
import { CheckInCountComponent } from 'app/entities/check-in-count/check-in-count.component';
import { CheckInCountService } from 'app/entities/check-in-count/check-in-count.service';
import { CheckInCount } from 'app/shared/model/check-in-count.model';

describe('Component Tests', () => {
    describe('CheckInCount Management Component', () => {
        let comp: CheckInCountComponent;
        let fixture: ComponentFixture<CheckInCountComponent>;
        let service: CheckInCountService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PeoplecounterTestModule],
                declarations: [CheckInCountComponent],
                providers: []
            })
                .overrideTemplate(CheckInCountComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CheckInCountComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CheckInCountService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CheckInCount(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.checkInCounts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
