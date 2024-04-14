import { Component, Input, OnInit } from '@angular/core';
import { Adress } from 'src/app/FrontOffice/Front-Core/Models/Carpooling/adress';

@Component({
  selector: 'app-deteails-announcement',
  templateUrl: './deteails-announcement.component.html',
  styleUrls: ['./deteails-announcement.component.css']
})
export class DeteailsAnnouncementComponent implements OnInit {
  ngOnInit(): void {
    this.markers=this.adresses?.map((adress,index,array)=> new H.map.Marker({lat:adress.latitude,lng:adress.longitude})    )

  }

  markers:Array<H.map.Marker>|undefined
  @Input()adresses!:Array<Adress>|undefined

}
