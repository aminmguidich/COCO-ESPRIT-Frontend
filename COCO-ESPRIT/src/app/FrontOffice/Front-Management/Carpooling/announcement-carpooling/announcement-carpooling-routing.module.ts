import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAnnouncementComponent } from './list-announcement/list-announcement.component';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { UpdateAnnouncementComponent } from './update-announcement/update-announcement.component';

const routes: Routes = [
  {
    path:"",
    component:ListAnnouncementComponent
  },
  {
    path:"AddAnn",
    component:AddAnnouncementComponent
  },
  {
    path:"UpdateAnn",
    component:UpdateAnnouncementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementCarpoolingRoutingModule { }
