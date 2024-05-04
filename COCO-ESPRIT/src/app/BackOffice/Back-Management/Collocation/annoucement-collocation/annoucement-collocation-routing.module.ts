import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAnnoucementComponent } from './list-annoucement/list-annoucement.component';
import { AddAnnoucementComponent } from './add-annoucement/add-annoucement.component';
import { UpdateAnnoucementComponent } from './update-annoucement/update-annoucement.component';
import { PieChartComponentComponent } from './pie-chart-component/pie-chart-component.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  {
    path: "", component: ListAnnoucementComponent
  },

  {
    path: "postAnn", component: AddAnnoucementComponent
  },

  {
    path: "updateAnn/:id", component: UpdateAnnoucementComponent,
  },
  {
    path: "Piechart", component: PieChartComponentComponent,
  }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnoucementCollocationRoutingModule { }
