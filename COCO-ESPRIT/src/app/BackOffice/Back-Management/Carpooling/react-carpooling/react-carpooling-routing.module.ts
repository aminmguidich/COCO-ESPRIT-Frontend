import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListReactComponent } from './list-react/list-react.component';

const routes: Routes = [
  {
    path:"listReact",
    component:ListReactComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactCarpoolingRoutingModule { }
