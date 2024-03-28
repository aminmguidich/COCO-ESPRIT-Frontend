import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PaginatorData } from 'src/app/FrontOffice/Front-Core/Models/Carpooling/paginator-data';


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
 //input
  pageSizeOptions = [3,5, 10, 25];
  @Input()length=50

  hidePageSize = true;
  showPageSizeOptions = false;
  showFirstLastButtons = true;
  disabled = false;

  @Output() paginatorOutput=new EventEmitter<PaginatorData>;
  //output
  data:PaginatorData=new PaginatorData;

  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.data.pageSize = e.pageSize;
    this.data.pageIndex = e.pageIndex;
    this.paginatorOutput.emit(this.data);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

}
