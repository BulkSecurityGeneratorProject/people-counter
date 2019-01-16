import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PeoplecounterSharedModule } from 'app/shared';
import {
    StoreComponent,
    StoreDetailComponent,
    StoreUpdateComponent,
    StoreDeletePopupComponent,
    StoreDeleteDialogComponent,
    storeRoute,
    storePopupRoute
} from './';

const ENTITY_STATES = [...storeRoute, ...storePopupRoute];

@NgModule({
    imports: [PeoplecounterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [StoreComponent, StoreDetailComponent, StoreUpdateComponent, StoreDeleteDialogComponent, StoreDeletePopupComponent],
    entryComponents: [StoreComponent, StoreUpdateComponent, StoreDeleteDialogComponent, StoreDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PeoplecounterStoreModule {}
