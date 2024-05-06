import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDragAndDropComponent } from './list-drag-and-drop/list-drag-and-drop.component';
import { MapContainerComponent } from './map-container/map-container.component';
import { MapComponent } from './map/map.component';
import { CDK_DRAG_CONFIG, DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { MapPositionComponent } from './map-position/map-position.component';
import { DeteailsAnnouncementComponent } from './deteails-announcement/deteails-announcement.component';
import { ProfileComponent } from './profile/profile.component';

const DragConfig = {
  dragStartThreshold: 0,
  pointerDirectionChangeThreshold: 5,
  zIndex: 10000,
};

@NgModule({
  declarations: [
    ListDragAndDropComponent,
    MapContainerComponent,
    MapComponent,
    MapPositionComponent,
    DeteailsAnnouncementComponent,
    ProfileComponent
  ],
  exports: [
    ListDragAndDropComponent,
    MapContainerComponent,
    MapComponent,
    MapPositionComponent,
    DeteailsAnnouncementComponent,
    ProfileComponent
  ],
  imports: [CommonModule, DragDropModule, MatListModule],
  providers: [{ provide: CDK_DRAG_CONFIG, useValue: DragConfig }],
})
export class SharedModule {}
