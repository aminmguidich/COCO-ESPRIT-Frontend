import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent  {
  @Input() pageSize: number; // Declare pageSize as an input property

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  nextPage() {
    // Emit pageChange event with the next page number
    this.pageChange.emit(this.pageSize + 1);
  }

  previousPage() {
    // Ensure that page number doesn't go below 1
    if (this.pageSize > 1) {
      // Emit pageChange event with the previous page number
      this.pageChange.emit(this.pageSize - 1);
    }
  }

  goToPage(pageNumber: number) {
    // Emit pageChange event with the specified page number
    this.pageChange.emit(pageNumber);
  }
  get pageSizeArray(): number[] {
    return Array.from({ length: this.pageSize }, (_, i) => i + 1);
  }


}
