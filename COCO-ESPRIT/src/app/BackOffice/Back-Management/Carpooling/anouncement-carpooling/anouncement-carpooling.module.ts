import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AnouncementCarpoolingRoutingModule } from './anouncement-carpooling-routing.module';
import { AddAnnoucementComponent } from './add-annoucement/add-annoucement.component';
import { ListAnnoucementComponent } from './list-annoucement/list-annoucement.component';
import { UpdateAnnouncementComponent } from './update-announcement/update-announcement.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddAnnoucementComponent,
    ListAnnoucementComponent,
    UpdateAnnouncementComponent,

  ],
  imports: [
    CommonModule,
    AnouncementCarpoolingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule

    
  ],
  providers:[DatePipe]
})
export class AnouncementCarpoolingModule { }
