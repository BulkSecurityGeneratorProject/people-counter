import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICheckInCount } from 'app/shared/model/check-in-count.model';
import { AccountService } from 'app/core';
import { CheckInCountService } from './check-in-count.service';

@Component({
    selector: 'jhi-check-in-count',
    templateUrl: './check-in-count.component.html'
})
export class CheckInCountComponent implements OnInit, OnDestroy {
    checkInCounts: ICheckInCount[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected checkInCountService: CheckInCountService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.checkInCountService.query().subscribe(
            (res: HttpResponse<ICheckInCount[]>) => {
                this.checkInCounts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCheckInCounts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICheckInCount) {
        return item.id;
    }

    registerChangeInCheckInCounts() {
        this.eventSubscriber = this.eventManager.subscribe('checkInCountListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
