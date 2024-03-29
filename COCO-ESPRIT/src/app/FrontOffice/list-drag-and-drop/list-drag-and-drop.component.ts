import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-list-drag-and-drop',
  templateUrl: './list-drag-and-drop.component.html',
  styleUrls: ['./list-drag-and-drop.component.css']
})
export class ListDragAndDropComponent {
  adresses = [

  ];
  dropEvent:Event|undefined;
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.adresses, event.previousIndex, event.currentIndex);
  }

}
