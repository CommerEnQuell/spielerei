import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuakeComponent }  from './quake/quake.component';
import { QuakeRepository } from './services/quake.repository';
import { QuakeService } from './services/quake.service';
import { RegistrationComponent } from './quake/registration/registration.component';

@NgModule({
    declarations: [
        QuakeComponent,
        RegistrationComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [QuakeService,  QuakeRepository]
    
})
export class QuakesModule {}
