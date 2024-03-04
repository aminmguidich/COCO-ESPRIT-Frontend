import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRatingComponent } from './list-rating/list-rating.component';

const routes: Routes = [
  {
    path:"listRating",
    component:ListRatingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatingCarpoolingRoutingModule { }
