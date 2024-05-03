import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import H from '@here/maps-api-for-javascript';
import onResize from 'simple-element-resize-detector';
import { Adress } from '../../FrontOffice/Front-Core/Models/Carpooling/adress';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  private map?: H.Map;
  public static esprit_location: H.geo.Point = new H.geo.Point(
    36.90007,
    10.18798
  );
  @Input() public zoom = 2;
  @Input() public lat = 0;
  @Input() public lng = 0;
  @Input() location_setter: boolean = false;
  @Input() location: H.geo.Point | undefined;
  @Input() location_marker: H.map.Marker | undefined;
  @Output() OnChangeLocation = new EventEmitter<H.geo.Point>();
  private timeoutHandle: any;
  @Input() readonly: boolean = true;
  @Input() adresses: Array<Adress> = [];
  @Input() markers: Array<H.map.Marker> = [];
  @Output() notify = new EventEmitter();
  @Output() OnAddMarker = new EventEmitter<H.map.Marker>();
  platform: H.service.Platform | undefined;
  ngOnChanges(changes: any) {
    clearTimeout(this.timeoutHandle);
    if (changes['location'] !== undefined && changes['location'].currentValue) {
      this.location = changes['location'].currentValue;
      this.map?.setCenter(
        this.location ? this.location : MapComponent.esprit_location
      );
      this.map?.setZoom(15);
      const marker = new H.map.Marker(this.location);
      this.map.addObject(marker);
      this.location_marker = marker;
    }
    if (changes['markers'] !== undefined) {
      let objects = this.map?.getObjects();
      if (objects) {
        this.map?.removeObjects(objects);
        this.markers.forEach((value, index, array) => {
          this.map?.addObject(value);
        });
        const marker = new H.map.Marker(MapComponent.esprit_location);
        marker.setData('Esprit');
        this.map?.addObject(marker);
      }
      if (this.platform && this.markers.length > 0) {
        this.routing(this.platform, this.markers);
      }
    }
    this.timeoutHandle = setTimeout(() => {
      if (this.map && this.adresses.length == 0) {
        if (changes['zoom'] !== undefined) {
          this.map.setZoom(changes['zoom'].currentValue);
        }
        if (changes['lat'] !== undefined) {
          this.map.setCenter({
            lat: changes['lat'].currentValue,
            lng: this.lng,
          });
        }
        if (changes['lng'] !== undefined) {
          this.map.setCenter({
            lat: this.lat,
            lng: changes['lng'].currentValue,
          });
        }
      }
    }, 100);
  }

  @ViewChild('map') mapDiv?: ElementRef;
  service: H.service.SearchService | undefined;
  ngAfterViewInit(): void {
    if (!this.map && this.mapDiv) {
      this.platform = new H.service.Platform({
        apikey: 'G5HgkNnhGYiUWeofOLfu4DvpgpOkkPza_5ReS-YEsqw',
      });

      this.service = this.platform.getSearchService();

      const layers = this.platform.createDefaultLayers();
      const map = new H.Map(
        this.mapDiv.nativeElement,
        (layers as any).vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          zoom: 15,
          center: MapComponent.esprit_location,
        }
      );

      if (!this.location_setter) {
        const marker = new H.map.Marker(MapComponent.esprit_location);
        marker.setData('Esprit');
        map.addObject(marker);
      }

      onResize(this.mapDiv.nativeElement, () => {
        map.getViewPort().resize();
      });
      this.map = map;

      this.map?.addEventListener('mapviewchange', (ev: H.map.ChangeEvent) => {
        this.notify.emit(ev);
      });
    }
    if (this.map) {
      new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
      if (this.adresses.length == 0 || !this.readonly) {
        this.map.addEventListener(
          'contextmenu',
          (e: H.mapevents.ContextMenuEvent) => {
            if (e.target !== this.map) {
              return;
            }

            var coord = this.map.screenToGeo(e.viewportX, e.viewportY);
            if (coord) {
              //------

              //-----
              const marker = new H.map.Marker({
                lat: coord.lat,
                lng: coord.lng,
              });
              this.service?.reverseGeocode(
                {
                  at: coord.lat + ',' + coord.lng,
                },
                (result: any) => {
                  if (result && result.items) {
                    marker.setData(result.items[0].title);
                    this.OnAddMarker.emit(marker);
                  }
                },
                alert
              );
              if (this.location_setter) {
                this.map.removeObject(this.location_marker);
                this.OnChangeLocation.emit(coord);
              } else {
                this.map.addObject(marker);
              }
            }
          }
        );
      }

      if (this.platform && !this.location_setter) {
        let markers = this.adresses.map((value, index, array) => {
          const marker = new H.map.Marker({
            lat: value.latitude,
            lng: value.longitude,
          });
          marker.setData(value.streetName);
          this.map?.addObject(marker);
          return marker;
        });
        this.routing(this.platform, markers);
        this.map.setZoom(9);
      }
    }
  }

  private routing(platform: H.service.Platform, markers: Array<H.map.Marker>) {
    let waypoints = [];
    waypoints = markers.slice(1).map((value, index, array) => {
      let point: any = value.getGeometry();
      return { lat: point.lat, lng: point.lng };
    });
    let origin: any = markers[0].getGeometry();
    //const origin = { lat: 56.97, lng: 24.09 };
    const destination = MapComponent.esprit_location;

    // Create the parameters for the routing request:
    const routingParameters = {
      routingMode: 'fast',
      transportMode: 'car',
      // The start point of the route:
      origin: `${origin.lat},${origin.lng}`,
      // The end point of the route:
      destination: `${destination.lat},${destination.lng}`,
      // Include the route shape in the response
      return: 'polyline',
      via: new H.service.Url.MultiValueQueryParameter(
        waypoints.map((wp) => `${wp.lat},${wp.lng}`)
      ),
    };
    // Define a callback function to process the routing response:
    const onResult = (result: any) => {
      // Ensure that at least one route was found
      if (result.routes.length) {
        const lineStrings: H.geo.LineString[] = [];
        result.routes[0].sections.forEach((section: { polyline: string }) => {
          // Create a linestring to use as a point source for the route line
          lineStrings.push(
            H.geo.LineString.fromFlexiblePolyline(section.polyline)
          );
        });

        // Create an instance of H.geo.MultiLineString
        const multiLineString = new H.geo.MultiLineString(lineStrings);
        // Create a polyline to display the route:
        let options: H.map.Spatial.Options = {
          style: {
            strokeColor: 'blue',
            lineWidth: 3,
          },
          data: undefined,
        };
        //--------------
        let geometries = multiLineString.getGeometries();
        let array: number[] = new Array();
        geometries.forEach((value, index, arr) => {
          for (let index = 0; index < value.$.length; index++) {
            const element = value.$[index];
            array.push(element);
          }
        });

        let polylineCoordinates = MapComponent.decodePolyline(array);
        navigator.geolocation.getCurrentPosition((position) => {
          let point: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          let minDistance = MapComponent.minimumDistanceBetweenPointAndPolyline(
            polylineCoordinates,
            point
          );
          let distance = MapComponent.calculateDistance(
            [point[0], point[1]],
            [MapComponent.esprit_location.lat, MapComponent.esprit_location.lng]
          );
          if (minDistance + 600 >= distance) {
          }
        });
        //--------------
        const routeLine = new H.map.Polyline(multiLineString, options);

        // Create a H.map.Group to hold all the map objects and enable us to obtain
        // the bounding box that contains all its objects within
        const group = new H.map.Group();
        group.addObjects([routeLine]);
        // Add the group to the map
        this.map?.addObject(group);

        // Set the map viewport to make the entire route visible:
        if (this.adresses.length == 0)
          this.map?.getViewModel().setLookAtData({
            bounds: group
              .getBoundingBox()
              .resizeToCenter(MapComponent.esprit_location),
          });
        else {
          this.map?.setCenter(MapComponent.esprit_location);
          this.map?.setZoom(15);
        }
      }
    };

    // Get an instance of the routing service version 8:
    const router = platform.getRoutingService(undefined, 8);

    // Call the calculateRoute() method with the routing parameters,
    // the callback, and an error callback function (called if a
    // communication error occurs):
    router.calculateRoute(routingParameters, onResult, function (error) {
      alert(error.message);
    });
  }

  //----------------------
  public static calculateDistance(
    point1: [number, number],
    point2: [number, number]
  ): number {
    const [lat1, lon1] = point1;
    const [lat2, lon2] = point2;
    const R = 6371e3; // meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return d;
  }

  public static minimumDistanceBetweenPointAndPolyline(
    polylineCoordinates: [number, number][],
    point: [number, number]
  ): number {
    let distances = [];
    for (let i = 0; i < polylineCoordinates.length; i++) {
      const point1 = polylineCoordinates[i];
      const distanceToPoint = this.calculateDistance(point, point1);
      distances.push(distanceToPoint);
    }
    return Math.min(...distances);
  }
  public static decodePolyline(polylineData) {
    var polylineCoordinates = [];
    for (var i = 0; i < polylineData.length; i += 3) {
      polylineCoordinates.push([polylineData[i], polylineData[i + 1]]);
    }
    return polylineCoordinates;
  }
  //----------------------
}
