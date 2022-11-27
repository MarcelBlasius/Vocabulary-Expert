import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { BoxesOverviewComponent } from './boxes-overview/boxes-overview.component';
import { BoxComponent } from './box/box.component';
import { AddVocabularyComponent } from './add-vocabulary/add-vocabulary.component';
import { EditVocabularyComponent } from './edit-vocabulary/edit-vocabulary.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Drivers } from '@ionic/storage';
import { AddBoxComponent } from './add-box/add-box.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    StatisticsComponent,
    BoxesOverviewComponent,
    BoxComponent,
    AddVocabularyComponent,
    EditVocabularyComponent,
    AddBoxComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    IonicModule.forRoot({ animated: false }),
    AppRoutingModule,
    CommonModule,
    HammerModule,
    IonicStorageModule.forRoot({
      driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB],
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
