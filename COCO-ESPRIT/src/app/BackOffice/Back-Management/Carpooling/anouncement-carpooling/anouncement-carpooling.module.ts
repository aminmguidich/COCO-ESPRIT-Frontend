import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnouncementCarpoolingRoutingModule } from './anouncement-carpooling-routing.module';
import { AddAnnoucementComponent } from './add-annoucement/add-annoucement.component';
import { ListAnnoucementComponent } from './list-annoucement/list-annoucement.component';
import { UpdateAnnouncementComponent } from './update-announcement/update-announcement.component';


@NgModule({
  declarations: [
    AddAnnoucementComponent,
    ListAnnoucementComponent,
    UpdateAnnouncementComponent
  ],
  imports: [
    CommonModule,
    AnouncementCarpoolingRoutingModule
  ]
})
export class AnouncementCarpoolingModule { }
