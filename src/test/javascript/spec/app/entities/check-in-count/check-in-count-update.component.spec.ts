/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PeoplecounterTestModule } from '../../../test.module';
import { CheckInCountUpdateComponent } from 'app/entities/check-in-count/check-in-count-update.component';
import { CheckInCountService } from 'app/entities/check-in-count/check-in-count.service';
import { CheckInCount } from 'app/shared/model/check-in-count.model';

describe('Component Tests', () => {
    describe('CheckInCount Management Update Component', () => {
        let comp: CheckInCountUpdateComponent;
        let fixture: ComponentFixture<CheckInCountUpdateComponent>;
        let service: CheckInCountService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PeoplecounterTestModule],
                declarations: [CheckInCountUpdateComponent]
            })
                .overrideTemplate(CheckInCountUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CheckInCountUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CheckInCountService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CheckInCount(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.checkInCount = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CheckInCount();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.checkInCount = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
