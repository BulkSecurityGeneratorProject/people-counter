/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PeoplecounterTestModule } from '../../../test.module';
import { CheckInCountDetailComponent } from 'app/entities/check-in-count/check-in-count-detail.component';
import { CheckInCount } from 'app/shared/model/check-in-count.model';

describe('Component Tests', () => {
    describe('CheckInCount Management Detail Component', () => {
        let comp: CheckInCountDetailComponent;
        let fixture: ComponentFixture<CheckInCountDetailComponent>;
        const route = ({ data: of({ checkInCount: new CheckInCount(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PeoplecounterTestModule],
                declarations: [CheckInCountDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CheckInCountDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CheckInCountDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.checkInCount).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
