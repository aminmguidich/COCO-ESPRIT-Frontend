import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnouncementCarpooling } from 'src/app/BackOffice/Back-Core/Models/Carpooling/announcement-carpooling';
import { AnnouncementCarpoolingService } from 'src/app/BackOffice/Back-Core/Services/Carpooling/announcement-carpooling.service';
import { Adress } from 'src/app/FrontOffice/Front-Core/Models/Carpooling/adress';
import { Route } from 'src/app/FrontOffice/Front-Core/Models/Carpooling/route';
import { User } from 'src/app/FrontOffice/Front-Core/Models/Carpooling/user';
import { AdressService } from 'src/app/FrontOffice/Front-Core/Services/Carpooling/adress.service';
import { RouteService } from 'src/app/FrontOffice/Front-Core/Services/Carpooling/route.service';

@Component({
  selector: 'app-add-annoucement',
  templateUrl: './add-annoucement.component.html',
  styleUrls: ['./add-annoucement.component.css']
})
export class AddAnnoucementComponent implements OnInit {


  users:  User[]=[];
  selectedUser: number | undefined;


  onMoveItem($event: { previousIndex: number; currentIndex: number; }) {
    console.log($event)
    /*
   let adress=JSON.parse(JSON.stringify(this.adresses[$event.previousIndex].split('').join('')));
   this.adresses[$event.previousIndex]=JSON.parse(JSON.stringify(this.adresses[$event.currentIndex].split('').join('')))
   this.adresses[$event.currentIndex]=adress
   let newAdArr=this.adresses.slice(0)
   this.adresses=newAdArr
   */
    let markerToMove=this.markers[$event.previousIndex]
    if($event.previousIndex<$event.currentIndex){
      for(let i=$event.previousIndex;i<$event.currentIndex;i++){
        this.markers[i]=this.markers[i+1]
      }
    }else{
      for(let i=$event.previousIndex;i>$event.currentIndex;i--){
        this.markers[i]=this.markers[i-1]
      }
    }
    this.markers[$event.currentIndex]=markerToMove
    /*
  let marker=this.markers[$event.previousIndex]
  this.markers[$event.previousIndex]=this.markers[$event.currentIndex]
  this.markers[$event.currentIndex]=marker*/
  let newArr=this.markers.slice(0)
  this.markers=newArr
  console.log(this.markers)
  }
  onClose() {
    this.markers=[]
    this.adresses=["Esprit"]
  }
  onRemoveItem($event: number) {
    let newArr=this.adresses.slice(0,this.adresses.length-1).filter((value,index,array)=>
       index!=$event)
      newArr.push("Esprit")
    this.adresses=newArr
    
    let newMarkersArr=this.markers.filter((value,index,array)=>
    index!=$event)
    this.markers=newMarkersArr;
    document.getElementById("map")?.scrollIntoView()
  
  }
  
    markers:Array<H.map.Marker>=[];
    adresses:Array<string>=["Esprit"]
  onAddMarker($event:H.map.Marker) {
    let newArr=this.adresses.slice(0,this.adresses.length-1)
    newArr.push($event.getData())
    newArr.push("Esprit")
    
    this.markers.push($event)
    //let ms=this.markers;
    this.markers=this.markers.slice(0)
    this.adresses=newArr
    document.getElementById("map")?.scrollIntoView()
  }
    isMapVisible: Boolean=false;
    constructor(private annCarpoolingService:AnnouncementCarpoolingService , private router: Router,private adressService:AdressService,private routeService:RouteService) { }
   
    ngOnInit() {


              
      this.annCarpoolingService.getAllUsers().subscribe(
        (data: User[]) => {
          console.log(data,);
          this.users = data;
  
        }),
        (error: any) => {
          console.error('Error fetching user by ID:', error);
        }
      ;
    }
    OnAddAdress(){
      this.isMapVisible=true
    }
    async add(form: NgForm) {
      if(!form.valid){
        console.log("yaeoisjf")
        return
      }
      let adresses:Array<Adress>=[]
      for(let i=0;i<this.markers.length;i++){
        let position:any=this.markers[i].getGeometry()
        const adress:Adress={
          idAdress:0,
          streetName:this.markers[i].getData(),
          latitude :position.lat,
        longitude:position.lng
        }
        let newAdress=await this.adressService.addAdress(adress).toPromise();
        if(newAdress){
  
          adresses.push(newAdress)
        }
      }
      const route:Route={
        idRoute:0,
        adressesRoute:adresses,
        distance:5,
      }
      let newRoute=await this.routeService.addRoute(route).toPromise();
      if(newRoute){
  // Convert the string to a Date object
      const date = new Date(form.value.date);
      const user:User={
        id: this.selectedUser,
        fullname: '',
        score: 0,
        adressUser: new Adress,
        username: '',
        password: '',
        email: '',
        roles: []
      }
      const annCarpooling: AnnouncementCarpooling = {
        idCarpoolingAnnouncement: 0,
        description: form.value.description,
        dateCarpoolingAnnouncement: date,
        userAnnCarpooling: user,
        routeAnnCarpooling: newRoute,
        ridePrice: form.value.price,
        places: form.value.places,
        reactCarpoolingsAnnCarpooling: []
      };
  
      this.annCarpoolingService.AddAnnCarpoolingAdmin(annCarpooling).subscribe(
        () => {
          alert('Added Successfully!');
          //this.router.navigate(["admin/carpooling/announcement"]);
          this.annCarpoolingService.filter('RegisterClick')
        },
        error => {
          console.error(error);
        }
      );
      }

      
    }

    selectUser(event: Event): void {
      const target = event.target as HTMLSelectElement;
      this.selectedUser =Number.parseInt(target.value);
      console.log(this.selectedUser)
    }
      
    


  
  }
  