import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { QuakesModule } from './quakes/quakes.module';
import { HomeComponent } from './home/home.component';
import { KnmiComponent } from './weer/knmi/knmi.component';
import { KnmiDaggegevensComponent } from './weer/knmi/dag/knmi-daggegevens.component';
import { KnmiOverzichtComponent } from './weer/knmi/overzicht/knmi-overzicht.component';
import { KnmiQueryComponent } from './weer/knmi/query/knmi-query.component';
import { KnmiRepository } from './weer/knmi/services/knmi.repository';
import { KnmiResultComponent } from './weer/knmi/result/knmi-result.component';
import { KnmiService } from './weer/knmi/services/knmi.service';
import { KnmiUtils } from './weer/knmi/services/knmi.utils';
import { CommonRepository } from './common/common.repository';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    KnmiComponent,
    KnmiDaggegevensComponent,
    KnmiOverzichtComponent,
    KnmiQueryComponent,
    KnmiResultComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuakesModule
  ],
  providers: [CommonRepository, KnmiService, KnmiRepository, KnmiUtils],
  bootstrap: [AppComponent]
})
export class AppModule { }
