import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PeoplecounterSharedModule } from 'app/shared';
import {
    CheckInCountComponent,
    CheckInCountDetailComponent,
    CheckInCountUpdateComponent,
    CheckInCountDeletePopupComponent,
    CheckInCountDeleteDialogComponent,
    checkInCountRoute,
    checkInCountPopupRoute
} from './';

const ENTITY_STATES = [...checkInCountRoute, ...checkInCountPopupRoute];

@NgModule({
    imports: [PeoplecounterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CheckInCountComponent,
        CheckInCountDetailComponent,
        CheckInCountUpdateComponent,
        CheckInCountDeleteDialogComponent,
        CheckInCountDeletePopupComponent
    ],
    entryComponents: [
        CheckInCountComponent,
        CheckInCountUpdateComponent,
        CheckInCountDeleteDialogComponent,
        CheckInCountDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PeoplecounterCheckInCountModule {}
