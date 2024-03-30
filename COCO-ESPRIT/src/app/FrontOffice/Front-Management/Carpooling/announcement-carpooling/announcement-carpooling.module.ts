import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnouncementCarpoolingRoutingModule } from './announcement-carpooling-routing.module';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { ListAnnouncementComponent } from './list-announcement/list-announcement.component';
import { UpdateAnnouncementComponent } from './update-announcement/update-announcement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginatorComponent } from '../paginator/paginator.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ListDragAndDropComponent } from 'src/app/FrontOffice/list-drag-and-drop/list-drag-and-drop.component';
import {CDK_DRAG_CONFIG, DragDropModule} from '@angular/cdk/drag-drop';
import { MapContainerComponent } from 'src/app/FrontOffice/map-container/map-container.component';
import { MapPositionComponent } from 'src/app/FrontOffice/map-position/map-position.component';
import { MapComponent } from 'src/app/FrontOffice/map/map.component';

const DragConfig = {
  dragStartThreshold: 0,
  pointerDirectionChangeThreshold: 5,
  zIndex: 10000
};

@NgModule({
  declarations: [
    AddAnnouncementComponent,
    ListAnnouncementComponent,
    UpdateAnnouncementComponent,
    PaginatorComponent,
    ListDragAndDropComponent,
    MapContainerComponent,
    MapComponent,
    MapPositionComponent,


    
  ],
  imports: [
    CommonModule,
    AnnouncementCarpoolingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatPaginatorModule,
    MatNativeDateModule,
    DragDropModule 
  ],
  providers: [{ provide: CDK_DRAG_CONFIG, useValue: DragConfig }]

})
export class AnnouncementCarpoolingModule { }
