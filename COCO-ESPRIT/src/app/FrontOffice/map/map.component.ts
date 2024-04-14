import { Component, ViewChild, ElementRef, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import H from '@here/maps-api-for-javascript';
import onResize from 'simple-element-resize-detector';
import { Adress } from '../Front-Core/Models/Carpooling/adress';
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
@Input() adresses:Array<Adress>=[]
@Input()  markers:Array<H.map.Marker>=[];
@Output() notify = new EventEmitter();
@Output() OnAddMarker= new EventEmitter<H.map.Marker>();
  platform: H.service.Platform|undefined;
ngOnChanges(changes: any) {
  clearTimeout(this.timeoutHandle);
  if (changes['markers'] !== undefined) {
    console.log(this.markers)
    let objects=this.map?.getObjects()
    if(objects){
      this.map?.removeObjects(objects)
      this.markers.forEach((value,index,array)=>{
        this.map?.addObject(value)
      })
      const marker = new H.map.Marker(this.esprit_location);
      marker.setData("Esprit");
      this.map?.addObject(marker);
      
    }
    if(this.platform && this.markers.length>0){
      this.routing(this.platform,this.markers);
    }
  }
    this.timeoutHandle = setTimeout(() => {
      if (this.map && this.adresses.length==0) {
        
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
      this.platform = new H.service.Platform({
        apikey: '-l1Pfp2wENzLMBbe4_LjKlIMprRTzEicFn7jSu2gezk'
      });

      this.service = this.platform.getSearchService();
      
      const layers = this.platform.createDefaultLayers();
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
    
    this.map?.addEventListener('mapviewchange', (ev: H.map.ChangeEvent) => {
      this.notify.emit(ev)
    });
      //---------------------
      // Routing
      //---------------------
          //
      //---------------------
      }
    if(this.map){
      
      new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
      if(this.adresses.length==0){
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
      })}
      
      if(this.platform &&this.adresses.length>0){
        let markers=this.adresses.map((value,index,array)=>{
          const marker = new H.map.Marker({lat:value.latitude,lng:value.longitude});
          marker.setData(value.streetName);
          this.map?.addObject(marker);
          return marker
        })
        console.log(markers)
        this.routing(this.platform,markers)
        this.map.setZoom(9)
      }
    }
    

  }

  


  private routing(platform: H.service.Platform,markers:Array<H.map.Marker>) {
    let waypoints = [ ]
    waypoints=markers.slice(1).map((value,index,array)=>{
      let point:any=value.getGeometry()
      return {lat:point.lat,lng:point.lng}
    })
    let origin:any=markers[0].getGeometry()
    //const origin = { lat: 56.97, lng: 24.09 };
    const destination = this.esprit_location

    // Create the parameters for the routing request:
    const routingParameters = {
      'routingMode': 'fast',
      'transportMode': 'car',
      // The start point of the route:
      'origin': `${ origin.lat},${origin.lng}`,
      // The end point of the route:
      'destination': `${destination.lat},${destination.lng}`,
      // Include the route shape in the response
      'return': 'polyline',
      'via': new H.service.Url.MultiValueQueryParameter(
        waypoints.map(wp => `${wp.lat},${wp.lng}`)
      )
    };
    // Define a callback function to process the routing response:
    const onResult = (result: any) => {
      // Ensure that at least one route was found
      if (result.routes.length) {
        const lineStrings: H.geo.LineString[] = [];
        result.routes[0].sections.forEach((section: { polyline: string; }) => {
          // Create a linestring to use as a point source for the route line
          lineStrings.push(H.geo.LineString.fromFlexiblePolyline(section.polyline));
        });

        // Create an instance of H.geo.MultiLineString
        const multiLineString = new H.geo.MultiLineString(lineStrings);

        // Create a polyline to display the route:
        let options: H.map.Spatial.Options = {
          style: {
            strokeColor: 'blue',
            lineWidth: 3
          },
          data: undefined
        };
        const routeLine = new H.map.Polyline(multiLineString, options);


        // Create a H.map.Group to hold all the map objects and enable us to obtain 
        // the bounding box that contains all its objects within
        const group = new H.map.Group();
        group.addObjects([routeLine]);
        // Add the group to the map
        this.map?.addObject(group);

        // Set the map viewport to make the entire route visible:
       if(this.adresses.length==0)this.map?.getViewModel().setLookAtData({
          bounds: group.getBoundingBox().resizeToCenter(this.esprit_location)
        });
        else{
          this.map?.setCenter(this.esprit_location)
          this.map?.setZoom(15)
        }
        
  
      };
    };

    // Get an instance of the routing service version 8:
    const router = platform.getRoutingService(undefined, 8);

    // Call the calculateRoute() method with the routing parameters,
    // the callback, and an error callback function (called if a
    // communication error occurs):
    router.calculateRoute(routingParameters, onResult,
      function (error) {
        alert(error.message);
      });
  }
}
