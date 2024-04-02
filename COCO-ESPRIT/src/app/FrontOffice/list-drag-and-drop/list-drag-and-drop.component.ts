import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-list-drag-and-drop',
  templateUrl: './list-drag-and-drop.component.html',
  styleUrls: ['./list-drag-and-drop.component.css']
})
export class ListDragAndDropComponent implements OnChanges{

  @Output() removeItemNotify=new EventEmitter<number>;

onRemoveItem(index: number) {
this.removeItemNotify.emit(index)
}
  ngOnChanges(changes: SimpleChanges): void {
  }
  
  ngOnInit() {
  }
  @Input() adresses:Array<string> = [];
  @Output() onMoveItem=new EventEmitter<{previousIndex:number,currentIndex:number}>
  dropEvent:Event|undefined;
  drop(event: CdkDragDrop<string[]>) {
    if(event.currentIndex==this.adresses.length-1){
      return
    }
    moveItemInArray(this.adresses, event.previousIndex, event.currentIndex);
    this.onMoveItem.emit({previousIndex: event?.previousIndex,currentIndex: event.currentIndex})
  }

}
