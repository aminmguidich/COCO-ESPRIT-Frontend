import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAnnoucementComponent } from './list-annoucement/list-annoucement.component';
import { AddAnnoucementComponent } from './add-annoucement/add-annoucement.component';
import { UpdateAnnouncementComponent } from './update-announcement/update-announcement.component';

const routes: Routes = [
{
  path:"",
  component:ListAnnoucementComponent
},
{
  path:"addAnn",
  component:AddAnnoucementComponent
},
{
  path:"updateAnn",
  component:UpdateAnnouncementComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnouncementCarpoolingRoutingModule { }
