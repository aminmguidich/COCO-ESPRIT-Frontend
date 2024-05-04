import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnoucementCollocationRoutingModule } from './annoucement-collocation-routing.module';
import { AddAnnoucementComponent } from './add-annoucement/add-annoucement.component';
import { ListAnnoucementComponent } from './list-annoucement/list-annoucement.component';
import { UpdateAnnoucementComponent } from './update-annoucement/update-annoucement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PieChartComponentComponent } from './pie-chart-component/pie-chart-component.component';
import { QuizComponent } from './quiz/quiz.component';
import { NgxPaginationModule } from 'ngx-pagination';





@NgModule({
  declarations: [
    AddAnnoucementComponent,
    ListAnnoucementComponent,
    UpdateAnnoucementComponent,
    PieChartComponentComponent
  ],
  imports: [
    CommonModule,
    AnnoucementCollocationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
   

    
    
  ]
})
export class AnnoucementCollocationModule { }
