import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AddBoxComponent } from './add-box/add-box.component';
import { AddVocabularyComponent } from './add-vocabulary/add-vocabulary.component';
import { BoxComponent } from './box/box.component';
import { BoxesOverviewComponent } from './boxes-overview/boxes-overview.component';
import { EditVocabularyComponent } from './edit-vocabulary/edit-vocabulary.component';
import { HomeComponent } from './home/home.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'vocabularies',
    component: BoxesOverviewComponent,
  },
  {
    path: 'box/add',
    component: AddBoxComponent,
  },
  {
    path: 'vocabularies/:id',
    component: BoxComponent,
  },
  {
    path: 'vocabularies/:id/add',
    component: AddVocabularyComponent,
  },
  {
    path: 'vocabularies/:id/:vocabularyId',
    component: EditVocabularyComponent,
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
