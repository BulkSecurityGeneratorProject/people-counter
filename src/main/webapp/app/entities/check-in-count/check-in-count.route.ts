import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CheckInCount } from 'app/shared/model/check-in-count.model';
import { CheckInCountService } from './check-in-count.service';
import { CheckInCountComponent } from './check-in-count.component';
import { CheckInCountDetailComponent } from './check-in-count-detail.component';
import { CheckInCountUpdateComponent } from './check-in-count-update.component';
import { CheckInCountDeletePopupComponent } from './check-in-count-delete-dialog.component';
import { ICheckInCount } from 'app/shared/model/check-in-count.model';

@Injectable({ providedIn: 'root' })
export class CheckInCountResolve implements Resolve<ICheckInCount> {
    constructor(private service: CheckInCountService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CheckInCount> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CheckInCount>) => response.ok),
                map((checkInCount: HttpResponse<CheckInCount>) => checkInCount.body)
            );
        }
        return of(new CheckInCount());
    }
}

export const checkInCountRoute: Routes = [
    {
        path: 'check-in-count',
        component: CheckInCountComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CheckInCounts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'check-in-count/:id/view',
        component: CheckInCountDetailComponent,
        resolve: {
            checkInCount: CheckInCountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CheckInCounts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'check-in-count/new',
        component: CheckInCountUpdateComponent,
        resolve: {
            checkInCount: CheckInCountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CheckInCounts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'check-in-count/:id/edit',
        component: CheckInCountUpdateComponent,
        resolve: {
            checkInCount: CheckInCountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CheckInCounts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const checkInCountPopupRoute: Routes = [
    {
        path: 'check-in-count/:id/delete',
        component: CheckInCountDeletePopupComponent,
        resolve: {
            checkInCount: CheckInCountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CheckInCounts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
