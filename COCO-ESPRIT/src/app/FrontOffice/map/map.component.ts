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
private  esprit_location:H.geo.Point=new H.geo.Point( 36.90007,  10.18798);
@Input() public zoom = 2;
@Input() public lat = 0;
@Input() public lng = 0;

private timeoutHandle: any;
@Input()  markers:Array<H.map.Marker>=[];
@Output() notify = new EventEmitter();
@Output() OnAddMarker= new EventEmitter<H.map.Marker>();
ngOnChanges(changes: any) {
  clearTimeout(this.timeoutHandle);
  if (changes['markers'] !== undefined) {
    console.log("hahha")
  let objects=this.map?.getObjects()
    if(objects){
      this.map?.removeObjects(objects)
      this.markers.forEach((value,index,array)=>{
        this.map?.addObject(value)
      })
      const marker = new H.map.Marker(this.esprit_location);
      marker.setData("Esprit");
      this.map?.addObject(marker);
      
    }}
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
  service: H.service.SearchService|undefined;
  ngAfterViewInit(): void {

// This array stores coordinates of some interesting landmarks in Luxembourg City:
    


    if (!this.map && this.mapDiv) {
      const platform = new H.service.Platform({
        apikey: '-l1Pfp2wENzLMBbe4_LjKlIMprRTzEicFn7jSu2gezk'
      });

      this.service = platform.getSearchService();
      
      const layers = platform.createDefaultLayers();
      const map = new H.Map(
        this.mapDiv.nativeElement,
        (layers as any).vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          // In this example, the map centers on
          // Luxembourg City, with the zoom level of 16:
          zoom: 15,
          center: this.esprit_location
        },
      );
      const marker = new H.map.Marker(this.esprit_location);
      marker.setData("Esprit");
      map.addObject(marker);
      
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
          this.service?.reverseGeocode({
            at: coord.lat+','+coord.lng
          }, (result:any) => {
            if(result && result.items){
              marker.setData(result.items[0].title);
              this.OnAddMarker.emit(marker);
            }
          }, alert);
          this.map.addObject(marker);
          
        }
      })
      
    }
    

  }

  

}
