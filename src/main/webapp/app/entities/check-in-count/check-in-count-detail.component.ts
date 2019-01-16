import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICheckInCount } from 'app/shared/model/check-in-count.model';

@Component({
    selector: 'jhi-check-in-count-detail',
    templateUrl: './check-in-count-detail.component.html'
})
export class CheckInCountDetailComponent implements OnInit {
    checkInCount: ICheckInCount;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ checkInCount }) => {
            this.checkInCount = checkInCount;
        });
    }

    previousState() {
        window.history.back();
    }
}
