/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PeoplecounterTestModule } from '../../../test.module';
import { CheckInCountDeleteDialogComponent } from 'app/entities/check-in-count/check-in-count-delete-dialog.component';
import { CheckInCountService } from 'app/entities/check-in-count/check-in-count.service';

describe('Component Tests', () => {
    describe('CheckInCount Management Delete Component', () => {
        let comp: CheckInCountDeleteDialogComponent;
        let fixture: ComponentFixture<CheckInCountDeleteDialogComponent>;
        let service: CheckInCountService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PeoplecounterTestModule],
                declarations: [CheckInCountDeleteDialogComponent]
            })
                .overrideTemplate(CheckInCountDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CheckInCountDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CheckInCountService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
