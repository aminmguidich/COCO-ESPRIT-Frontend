import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/BackOffice/Back-Core/Models/User/User';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
 @Input() user: User;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
