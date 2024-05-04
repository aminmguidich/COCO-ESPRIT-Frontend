import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListannComponent } from './listann/listann.component';

import { RaitingComponent } from './raiting/raiting.component';

const routes: Routes = [
  {
    path:"",component:ListannComponent
  },
  {
    path:"appRating/:id",component:RaitingComponent
  },

 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AannoucementCollRoutingModule { }
