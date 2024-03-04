import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatingCarpoolingRoutingModule } from './rating-carpooling-routing.module';
import { ListRatingComponent } from './list-rating/list-rating.component';


@NgModule({
  declarations: [
    ListRatingComponent
  ],
  imports: [
    CommonModule,
    RatingCarpoolingRoutingModule
  ]
})
export class RatingCarpoolingModule { }
