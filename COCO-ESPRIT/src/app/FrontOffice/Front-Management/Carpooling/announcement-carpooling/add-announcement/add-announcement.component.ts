import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnouncementCarpooling } from 'src/app/FrontOffice/Front-Core/Models/Carpooling/announcement-carpooling';
import { User } from 'src/app/FrontOffice/Front-Core/Models/Carpooling/user';
import { AnnouncementCarpoolingService } from 'src/app/FrontOffice/Front-Core/Services/Carpooling/announcement-carpooling.service';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css']
})
export class AddAnnouncementComponent implements OnInit{
onRemoveItem($event: number) {
  let newArr=this.adresses.slice(0,this.adresses.length-1).filter((value,index,array)=>
     index!=$event)
    newArr.push("Esprit")
  this.adresses=newArr
  
  let newMarkersArr=this.markers.filter((value,index,array)=>
  index!=$event)
  this.markers=newMarkersArr;
}

  markers:Array<H.map.Marker>=[];
  adresses:Array<string>=["Esprit"]
onAddMarker($event:H.map.Marker) {
  let newArr=this.adresses.slice(0,this.adresses.length-1)
  newArr.push($event.getData())
  newArr.push("Esprit")
  this.markers.push($event)
  this.adresses=newArr
}
  isMapVisible: Boolean=false;
  constructor(private annCarpoolingService:AnnouncementCarpoolingService , private router: Router) { }
  
  ngOnInit() {
  }
  OnAddAdress(){
    this.isMapVisible=true
  }
  add(form: NgForm) {
    if (form.valid) {
      // Convert the string to a Date object
      const date = new Date(form.value.date);
  
      const annCarpooling: AnnouncementCarpooling = {
        idCarpoolingAnnouncement: 0,
        description: form.value.description,
        score: Number(form.value.score),
        dateCarpoolingAnnouncement: date,
        userAnnCarpooling: new User
      };
  
      this.annCarpoolingService.AddAnnCarpooling(annCarpooling).subscribe(
        () => {
          alert('Added Successfully!');
          this.router.navigate(['admin/carpooling/announcement/']);
        },
        error => {
          console.error(error);
        }
      );
      
    }
  }
  

}
