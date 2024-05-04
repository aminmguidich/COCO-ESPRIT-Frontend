import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-map-position',
  templateUrl: './map-position.component.html',
  styleUrls: ['./map-position.component.css']
})
export class MapPositionComponent {
  @Output() notify = new EventEmitter();
  @Input() public zoom = 2;
  @Input() public lat = 0;
  @Input() public lng = 0;
  
}
