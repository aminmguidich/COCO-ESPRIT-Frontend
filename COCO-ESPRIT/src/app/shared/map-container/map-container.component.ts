import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Adress } from '../../FrontOffice/Front-Core/Models/Carpooling/adress';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.css']
})
export class MapContainerComponent implements OnChanges {
  @Input()  adresses:Array<Adress>=[];
  @Input() readonly:boolean=true;

  @Input()  markers:Array<H.map.Marker>=[];
  @Output() OnAddMarker= new EventEmitter<H.map.Marker>();
  @Output() OnRouteIsInconvenient = new EventEmitter();

handleAddMarker($event: H.map.Marker) {
  this.OnAddMarker.emit($event)
}
  title = 'jsapi-angular';

  constructor() {
    this.zoom = 2;
    this.lat = 0;
    this.lng = 0;
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

  zoom: number;
  lat: number;
  lng: number;


  handleInputChange(event: Event) {
    const target = <HTMLInputElement> event.target;
    if (target) {
      if (target.name === 'zoom') {
        this.zoom = parseFloat(target.value);
      }
      if (target.name === 'lat') {
        this.lat = parseFloat(target.value);
      }
      if (target.name === 'lng') {
        this.lng = parseFloat(target.value);
      }
    }
  }
  handleMapChange(event: H.map.ChangeEvent) {
    if (event.newValue.lookAt) {
      const lookAt = event.newValue.lookAt;
      this.zoom = lookAt.zoom;
      this.lat = lookAt.position.lat;
      this.lng = lookAt.position.lng;
    }
  }
  
}
