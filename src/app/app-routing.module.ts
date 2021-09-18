import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component'
import { DetailViewComponent } from './detail-view/detail-view.component';
import {ComparisonComponent} from './comparison/comparison.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'detail/:mmbid', component: DetailViewComponent },
  { path: 'detail', component: DetailViewComponent },
  { path: 'compare', component: ComparisonComponent },
  { path: '**', redirectTo: '/main', pathMatch: 'full' },
    
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
