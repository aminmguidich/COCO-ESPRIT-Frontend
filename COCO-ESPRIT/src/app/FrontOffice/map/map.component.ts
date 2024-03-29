import { Component, ViewChild, ElementRef, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import H from '@here/maps-api-for-javascript';
import onResize from 'simple-element-resize-detector';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  private map?: H.Map;

@Input() public zoom = 2;
@Input() public lat = 0;
@Input() public lng = 0;

private timeoutHandle: any;
@Output() notify = new EventEmitter();

ngOnChanges(changes: SimpleChanges) {
  
    clearTimeout(this.timeoutHandle);
    this.timeoutHandle = setTimeout(() => {
      if (this.map) {
        if (changes['zoom'] !== undefined) {
          this.map.setZoom(changes['zoom'].currentValue);
        }
        if (changes['lat'] !== undefined) {
          this.map.setCenter({lat: changes['lat'].currentValue, lng: this.lng});
        }
        if (changes['lng'] !== undefined) {
          this.map.setCenter({lat: this.lat, lng: changes['lng'].currentValue});
        }
      }
    }, 100);
}

  @ViewChild('map') mapDiv?: ElementRef; 

  ngAfterViewInit(): void {

// This array stores coordinates of some interesting landmarks in Luxembourg City:
    


    if (!this.map && this.mapDiv) {
      const platform = new H.service.Platform({
        apikey: '-l1Pfp2wENzLMBbe4_LjKlIMprRTzEicFn7jSu2gezk'
      });
      const layers = platform.createDefaultLayers();
      const map = new H.Map(
        this.mapDiv.nativeElement,
        (layers as any).vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          // In this example, the map centers on
          // Luxembourg City, with the zoom level of 16:
          zoom: 16,
          center: { lat: 49.6107, lng: 6.1314 }
        },
      );
      
      
      onResize(this.mapDiv.nativeElement, () => {
        map.getViewPort().resize();
      });
      this.map = map;
    }
    this.map?.addEventListener('mapviewchange', (ev: H.map.ChangeEvent) => {
      this.notify.emit(ev)
    });
    if(this.map){

      new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
      this.map.addEventListener("contextmenu", (e:H.mapevents.ContextMenuEvent) =>{
        if (e.target !== this.map) {
          return;
        }
        var coord  = this.map.screenToGeo(e.viewportX, e.viewportY);
        if(coord){
          const marker = new H.map.Marker({ lat: coord.lat, lng: coord.lng });
          marker.setData("");
          this.map.addObject(marker);
        }
      })
      
    }
    

  }

  

}
