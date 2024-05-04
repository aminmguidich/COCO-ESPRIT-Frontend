import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnouncementCarpooling } from 'src/app/BackOffice/Back-Core/Models/Carpooling/announcement-carpooling';
import { AnnouncementCarpoolingService } from 'src/app/BackOffice/Back-Core/Services/Carpooling/announcement-carpooling.service';
import { Adress } from 'src/app/FrontOffice/Front-Core/Models/Carpooling/adress';
import { AdressService } from 'src/app/FrontOffice/Front-Core/Services/Carpooling/adress.service';
import { RouteService } from 'src/app/FrontOffice/Front-Core/Services/Carpooling/route.service';

@Component({
  selector: 'app-update-announcement',
  templateUrl: './update-announcement.component.html',
  styleUrls: ['./update-announcement.component.css'],
})
export class UpdateAnnouncementComponent implements OnInit {
  removedAddresses: Adress[] = [];

  adressesAsStrings: Array<string> = ['Esprit'];
  onAddMarker($event: H.map.Marker) {
    let newArr = this.adressesAsStrings.slice(
      0,
      this.adressesAsStrings.length - 1
    );
    newArr.push($event.getData());
    newArr.push('Esprit');

    this.markers.push($event);
    //let ms=this.markers;
    this.markers = this.markers.slice(0);
    this.adressesAsStrings = newArr;
    document.getElementById('map')?.scrollIntoView();
    let position: any = $event.getGeometry();
    this.announcement.routeAnnCarpooling.adressesRoute.push({
      idAdress: -1,
      streetName: $event.getData(),
      latitude: position.lat,
      longitude: position.lng,
    });
  }
  onRemoveItem($event: number) {
    let removedAdress: Adress =
      this.announcement.routeAnnCarpooling.adressesRoute[$event];
    this.removedAddresses.push(removedAdress);
    let newArr = this.adressesAsStrings
      .slice(0, this.adressesAsStrings.length - 1)
      .filter((value, index, array) => index != $event);
    newArr.push('Esprit');
    this.adressesAsStrings = newArr;

    let newMarkersArr = this.markers.filter(
      (value, index, array) => index != $event
    );
    this.markers = newMarkersArr;
    document.getElementById('map')?.scrollIntoView();
    this.announcement.routeAnnCarpooling.adressesRoute =
      this.announcement.routeAnnCarpooling.adressesRoute.filter(
        (value, index, array) => {
          return index != $event;
        }
      );
  }

  onMoveItem($event: { previousIndex: number; currentIndex: number }) {
    let markerToMove = this.markers[$event.previousIndex];
    if ($event.previousIndex < $event.currentIndex) {
      for (let i = $event.previousIndex; i < $event.currentIndex; i++) {
        this.markers[i] = this.markers[i + 1];
      }
    } else {
      for (let i = $event.previousIndex; i > $event.currentIndex; i--) {
        this.markers[i] = this.markers[i - 1];
      }
    }
    this.markers[$event.currentIndex] = markerToMove;
    /*
  let marker=this.markers[$event.previousIndex]
  this.markers[$event.previousIndex]=this.markers[$event.currentIndex]
  this.markers[$event.currentIndex]=marker*/
    let newArr = this.markers.slice(0);
    this.markers = newArr;

    let adressToMove =
      this.announcement.routeAnnCarpooling.adressesRoute[$event.previousIndex];
    if ($event.previousIndex < $event.currentIndex) {
      for (let i = $event.previousIndex; i < $event.currentIndex; i++) {
        this.announcement.routeAnnCarpooling.adressesRoute[i] =
          this.announcement.routeAnnCarpooling.adressesRoute[i + 1];
      }
    } else {
      for (let i = $event.previousIndex; i > $event.currentIndex; i--) {
        this.announcement.routeAnnCarpooling.adressesRoute[i] =
          this.announcement.routeAnnCarpooling.adressesRoute[i - 1];
      }
    }
    this.announcement.routeAnnCarpooling.adressesRoute[$event.currentIndex] =
      adressToMove;
  }
  @Input() announcement!: AnnouncementCarpooling;

  annCarpooling!: AnnouncementCarpooling;
  updateForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formB: FormBuilder,
    private annCarpoolingService: AnnouncementCarpoolingService,
    private adressService: AdressService,
    private routeService: RouteService,
    public datepipe: DatePipe
  ) {}

  ngOnInit() {
    if (this.announcement == null) {
      return;
    }
    this.adressesAsStrings = this.adresses.map((value, index, array) => {
      return value.streetName;
    });
    this.adressesAsStrings.push('Esprit');
    let data = this.announcement;
    let date = new Date();
    let latest_date;
    if (date) {
      latest_date = this.datepipe.transform(date, 'yyyy-MM-dd');
    }
    /*
    date.setFullYear(data.dateCarpoolingAnnouncement[0])
    date.setMonth(data.dateCarpoolingAnnouncement[1])
    date.setDate(data.dateCarpoolingAnnouncement[2])*/

    this.updateForm = this.formB.group({
      dateAnnCarpooling: [latest_date],
      descriptionAnnCarpooling: [data.description],
      priceAnnCarpooling: [data.ridePrice],
      placesAnnCarpooling: [data.places],
    });
    this.updateForm.patchValue(data);

    this.markers = this.adresses?.map(
      (adress, index, array) =>
        new H.map.Marker({ lat: adress.latitude, lng: adress.longitude })
    );
  }

  markers: Array<H.map.Marker>;
  @Input() adresses!: Array<Adress> | undefined;

  async updateAnnouncementCarpooling() {
    this.announcement.dateCarpoolingAnnouncement =
      this.updateForm.value.dateAnnCarpooling;
    this.announcement.description =
      this.updateForm.value.descriptionAnnCarpooling;
    this.announcement.places = this.updateForm.value.placesAnnCarpooling;
    this.announcement.ridePrice = this.updateForm.value.priceAnnCarpooling;

    for (
      let index = 0;
      index < this.announcement.routeAnnCarpooling.adressesRoute.length;
      index++
    ) {
      const value = this.announcement.routeAnnCarpooling.adressesRoute[index];
      if (value.idAdress == -1) {
        let response = await this.adressService.addAdress(value).toPromise();
        this.announcement.routeAnnCarpooling.adressesRoute[index] = response;
      }
    }
    let route = await this.routeService
      .updateRoute(this.announcement.routeAnnCarpooling)
      .toPromise();
    this.announcement.routeAnnCarpooling = route;

    this.annCarpoolingService.updateAnnCarpooling(this.announcement).subscribe(
      async (response) => {
        //remove addresses no longer in use
        for (let index = 0; index < this.removedAddresses.length; index++) {
          const value = this.removedAddresses[index];
          await this.adressService.deleteAdress(value.idAdress).toPromise();
        }
        alert('Updated Successfully!');
      },
      (error) => {
        console.error('Update failed:', error);
      }
    );
  }
}
