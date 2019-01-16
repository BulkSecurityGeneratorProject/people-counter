import { NgModule } from '@angular/core';

import { PeoplecounterSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [PeoplecounterSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [PeoplecounterSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class PeoplecounterSharedCommonModule {}
