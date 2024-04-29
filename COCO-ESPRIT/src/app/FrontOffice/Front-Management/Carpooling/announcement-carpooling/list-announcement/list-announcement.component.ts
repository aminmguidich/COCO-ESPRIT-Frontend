import { StorageService } from 'src/app/BackOffice/Back-Core/Services/User/_services/storage.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Adress } from 'src/app/FrontOffice/Front-Core/Models/Carpooling/adress';
import { AnnouncementCarpooling } from 'src/app/FrontOffice/Front-Core/Models/Carpooling/announcement-carpooling';
import { PaginatorData } from 'src/app/FrontOffice/Front-Core/Models/Carpooling/paginator-data';
import { Route } from 'src/app/FrontOffice/Front-Core/Models/Carpooling/route';
import { User } from 'src/app/FrontOffice/Front-Core/Models/Carpooling/user';
import { RequirementCarpooling } from 'src/app/FrontOffice/Front-Core/Models/Carpooling/requirement-carpooling';
import { AnnouncementCarpoolingService } from 'src/app/FrontOffice/Front-Core/Services/Carpooling/announcement-carpooling.service';
import { RequirementCarpoolingService } from 'src/app/FrontOffice/Front-Core/Services/Carpooling/requirement-carpooling.service';
import { ReactCarpoolingService } from 'src/app/FrontOffice/Front-Core/Services/Carpooling/react-carpooling.service';
import { ReactCarpooling } from 'src/app/FrontOffice/Front-Core/Models/Carpooling/react-carpooling';
import { MapComponent } from 'src/app/shared/map/map.component';

@Component({
  selector: 'app-list-announcement',
  templateUrl: './list-announcement.component.html',
  styleUrls: ['./list-announcement.component.css'],
})
export class ListAnnouncementComponent implements OnInit {
  deleteAnnCarpooling(id: number) {
    this.annCarpoolingService.deleteAnnCarpooling(id).subscribe((response) => {
      alert(' Announcement deleted Successfully!');

      // this.router.navigate(['admin/carpooling/announcement/addAnn']);
      this.ngOnInit();
    });
  }

  AddReact() {
    throw new Error('Method not implemented.');
  }
  user: User = {
    id: undefined,
    fullname: '',
    score: 0,
    adressUser: new Adress(),
    username: '',
    password: '',
    email: '',
    roles: [],
  };
  Require(id: number) {
    const date = new Date();

    const reqCarpooling: RequirementCarpooling = {
      idCarRequirement: 0,
      description: '',
      dateCarpoolingRequirement: date,
      announcementCarpoolingReq: {
        idCarpoolingAnnouncement: id,
        dateCarpoolingAnnouncement: new Date(),
        description: '',
        score: 0,
        userAnnCarpooling: new User(),
        routeAnnCarpooling: new Route(),
        ridePrice: 0,
        places: 0,
        reactCarpoolingsAnnCarpooling: [],
      },
    };
    this.reqCarpoolingService
      .addReqCarpooling(reqCarpooling)
      .subscribe((next) => {
        this.ngOnInit();
      });
    /*
    const annCarpooling: AnnouncementCarpooling = {
      idCarpoolingAnnouncement: 0,
      description: form.value.description,
      score: Number(form.value.score),
      dateCarpoolingAnnouncement: date,
      userAnnCarpooling: user,
      routeAnnCarpooling:newRoute
    };

    this.annCarpoolingService.AddAnnCarpooling(annCarpooling).subscribe(
      () => {
        alert('Added Successfully!');
        //this.router.navigate(['admin/carpooling/announcement/']);
      },
      error => {
        console.error(error);
      }
    );
    }
    
      
  }

  */
  }

  onLike(reacts: Array<ReactCarpooling>, announcementId: number) {
    let reacted = false;
    let react: ReactCarpooling;
    console.log(reacts);
    reacts.forEach((value, index, array) => {
      if (value.userReact == this.user.id) {
        reacted = true;
        react = value;
      }
    });
    if (reacted) {
      this.reactCarpoolingService
        .deleteReactCarpooling(react.idReactCarpooling, announcementId)
        .subscribe((data) => {
          console.log('react deleted???');
          this.ngOnInit();
        });
      return;
    }
    this.reactCarpoolingService
      .addReactCarpooling(
        {
          idReactCarpooling: 0,
          userReact: this.user.id,
        },
        announcementId
      )
      .subscribe((data) => {
        this.ngOnInit();
      });
  }
  onPageChange($event: PaginatorData) {
    this.paginatorData = $event;
    let o = this.paginatorData.pageIndex * this.paginatorData.pageSize;
    if (o + this.paginatorData.pageSize < this.data.length) {
      this.availableData = this.data.slice(o, o + this.paginatorData.pageSize);
    } else {
      this.availableData = this.data.slice(o, this.data.length);
      let k = this.paginatorData.pageSize - this.availableData.length;
      for (let i = 0; i < k; i++) {
        this.availableData.push(null);
      }
    }
  }

  data: AnnouncementCarpooling[] = [];
  availableData: Array<AnnouncementCarpooling | null> = [];
  paginatorData: PaginatorData = new PaginatorData();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formB: FormBuilder,
    private annCarpoolingService: AnnouncementCarpoolingService,
    private reqCarpoolingService: RequirementCarpoolingService,
    private reactCarpoolingService: ReactCarpoolingService,
    public storageService: StorageService
  ) {}

  ngOnInit() {
    let platform = new H.service.Platform({
      apikey: 'HNhs9aUe13svIiECACHKjsyUyj7dx-XM3pi7t114eR0',
    });
    this.user.id = this.storageService.getUser()['id'];

    this.annCarpoolingService
      .getallPlaces()
      .subscribe((data: AnnouncementCarpooling[]) => {
        this.annCarpoolingService.getAllUsers().subscribe(async (users: User[]) => {
          this.data =await Promise.all(data.map( async (value, index, array) => {
            let markers = value.routeAnnCarpooling?.adressesRoute.map(
              (adress, index, array) =>
                new H.map.Marker({
                  lat: adress.latitude,
                  lng: adress.longitude,
                })
            );
            return(new Promise((resolve,reject)=>{
              navigator.geolocation.getCurrentPosition((position) => {
                let pos: [number,number]=[position.coords.latitude,position.coords.longitude]
                this.routing(platform, markers,pos, (result) => {
                  if (value.userAnnCarpooling.id) {
                    resolve(value);
                  }
                  for (let index = 0; index < users.length; index++) {
                    const element = users[index];
                    if (element.id.toString() == value.userAnnCarpooling.toString()) {
                      value.userAnnCarpooling = element;
                      break;
                    }
                  }
                  if(result){
                    value.idCarpoolingAnnouncement=-2
                  }
                  resolve(value)
                });
              });
            }))
          }));
          this.data=this.data.filter((value,index,array)=>value.idCarpoolingAnnouncement!=-2)

          let o = this.paginatorData.pageIndex * this.paginatorData.pageSize;

          if (o + this.paginatorData.pageSize < this.data.length) {
            this.availableData = this.data.slice(
              o,
              o + this.paginatorData.pageSize
            );
          } else {
            this.availableData = this.data.slice(o, this.data.length);
            let k = this.paginatorData.pageSize - this.availableData.length;
            for (let i = 0; i < k; i++) {
              this.availableData.push(null);
            }
          }
          console.log(this.availableData, 'j');
        }),
          (error: any) => {
            console.error('Error fetching user by ID:', error);
          };

        this.totalAnnouncements = this.data.filter((value,index,arr)=>value.idCarpoolingAnnouncement!=-2).length;
      }),
      (error: any) => {
        console.error('Error fetching user by ID:', error);
      };
  }

  totalAnnouncements!: number;

  private routing(
    platform: H.service.Platform,
    markers: Array<H.map.Marker>,
    position: [number,number],
    callback: (result: boolean) => void
  ) {
    let waypoints = [];
    waypoints = markers.slice(1).map((value, index, array) => {
      let point: any = value.getGeometry();
      return { lat: point.lat, lng: point.lng };
    });
    let origin: any = markers[0].getGeometry();
    const destination = MapComponent.esprit_location;
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
        
         
          let minDistance = MapComponent.minimumDistanceBetweenPointAndPolyline(
            polylineCoordinates,
            position
          );
          let distance = MapComponent.calculateDistance(
            [position[0], position[1]],
            [MapComponent.esprit_location.lat, MapComponent.esprit_location.lng]
          );
          console.log('minDistance', minDistance);
          console.log('distance', distance);

          if (minDistance + 600 >= distance) {
            callback(true);
          } else {
            callback(false);
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



  
}
