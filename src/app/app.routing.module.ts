import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(
    routes, {
      preloadingStrategy: PreloadAllModules
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
