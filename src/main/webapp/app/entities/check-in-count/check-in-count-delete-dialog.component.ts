import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICheckInCount } from 'app/shared/model/check-in-count.model';
import { CheckInCountService } from './check-in-count.service';

@Component({
    selector: 'jhi-check-in-count-delete-dialog',
    templateUrl: './check-in-count-delete-dialog.component.html'
})
export class CheckInCountDeleteDialogComponent {
    checkInCount: ICheckInCount;

    constructor(
        protected checkInCountService: CheckInCountService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.checkInCountService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'checkInCountListModification',
                content: 'Deleted an checkInCount'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-check-in-count-delete-popup',
    template: ''
})
export class CheckInCountDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ checkInCount }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CheckInCountDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.checkInCount = checkInCount;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
