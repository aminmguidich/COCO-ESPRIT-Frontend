import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-set-location',
  templateUrl: './set-location.component.html',
  styleUrls: ['./set-location.component.css']
})
export class SetLocationComponent  {
  OnSave() {
    this.OnLocationChange.emit(this.location)
  }
  @Output() OnLocationChange=new EventEmitter<H.geo.Point>()


OnChangeLocation($event: H.geo.Point) {
  this.location=$event
}

  location:H.geo.Point
  ngAfterViewInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.location=new H.geo.Point(position.coords.latitude,position.coords.longitude)
      this.OnLocationChange.emit(this.location)
    });
  }
}
