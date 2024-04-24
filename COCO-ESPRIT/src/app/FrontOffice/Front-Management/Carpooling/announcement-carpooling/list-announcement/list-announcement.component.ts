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

@Component({
  selector: 'app-list-announcement',
  templateUrl: './list-announcement.component.html',
  styleUrls: ['./list-announcement.component.css']
})
export class ListAnnouncementComponent implements OnInit  {
deleteAnnCarpooling(id: number) {
  this.annCarpoolingService.deleteAnnCarpooling(id).subscribe(
    (response) => {
      alert(' Announcement deleted Successfully!');

     // this.router.navigate(['admin/carpooling/announcement/addAnn']);
     this.ngOnInit();

    },
  )}

AddReact() {
throw new Error('Method not implemented.');
}
user:User={
  id: undefined,
  fullname: '',
  score: 0,
  adressUser: new Adress,
  username: '',
  password: '',
  email: '',
  roles: []
}
Require(id:number) {
  const date = new Date();
  
  const reqCarpooling:RequirementCarpooling={
    idCarRequirement: 0,
    description: '',
    dateCarpoolingRequirement: date,
    announcementCarpoolingReq: {
      idCarpoolingAnnouncement: id,
      dateCarpoolingAnnouncement: new Date,
      description: '',
      score: 0,
      userAnnCarpooling: new User,
      routeAnnCarpooling: new Route,
      ridePrice: 0,
      places: 0,
      reactCarpoolingsAnnCarpooling: []
    }
  }
this.reqCarpoolingService.addReqCarpooling(reqCarpooling).subscribe((next)=>{
  this.ngOnInit()
})
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

onLike(reacts:Array<ReactCarpooling>,announcementId:number){
  let reacted=false;
  let react:ReactCarpooling
  console.log(reacts)
  reacts.forEach((value,index,array)=>{
    if(value.userReact==this.user.id){
      reacted=true;
      react=value;
    }
  })  
  if(reacted){
    this.reactCarpoolingService.deleteReactCarpooling(react.idReactCarpooling,announcementId).subscribe((data)=>{
      console.log("react deleted???")
      this.ngOnInit()
    })
    return
  }
  this.reactCarpoolingService.addReactCarpooling(
    {
      idReactCarpooling: 0,
      userReact:this.user.id
    },announcementId
  ).subscribe((data)=>{
    this.ngOnInit()

  })


}
onPageChange($event: PaginatorData) {
  this.paginatorData=$event;
  let o=this.paginatorData.pageIndex*this.paginatorData.pageSize;
  if(o+this.paginatorData.pageSize<this.data.length){
    this.availableData=this.data.slice(o,o+this.paginatorData.pageSize)

  }else{
    this.availableData=this.data.slice(o,this.data.length)
    let k=this.paginatorData.pageSize-this.availableData.length
    for(let i=0;i<k;i++){
      this.availableData.push(null)
    }
  }
}
  
  data: AnnouncementCarpooling[] = [];
  availableData: Array<AnnouncementCarpooling|null> = [];
  paginatorData:PaginatorData=new PaginatorData;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private formB: FormBuilder,
    private annCarpoolingService: AnnouncementCarpoolingService,private reqCarpoolingService:RequirementCarpoolingService,
  private reactCarpoolingService :ReactCarpoolingService,public storageService:StorageService) { }
 
  ngOnInit() {

    this.user.id=this.storageService.getUser()['id']

    this.annCarpoolingService.getallPlaces().subscribe(
      (data: AnnouncementCarpooling[]) => {
        this.data = data;
        this.annCarpoolingService.getAllUsers().subscribe(
          (users: User[]) => {
            this.data=data.map((value,index,array)=>{
              if(value.userAnnCarpooling.id){
                return value;
              }
              for (let index = 0; index < users.length; index++) {
                const element = users[index];
                if(element.id.toString()==value.userAnnCarpooling.toString()){
                  value.userAnnCarpooling=element
                  break;
                }
              }                
              return value
            })
            let o=this.paginatorData.pageIndex*this.paginatorData.pageSize;

            if(o+this.paginatorData.pageSize<this.data.length){
              this.availableData=this.data.slice(o,o+this.paginatorData.pageSize)
            }else{
              this.availableData=this.data.slice(o,this.data.length)
              let k=this.paginatorData.pageSize-this.availableData.length
              for(let i=0;i<k;i++){
                this.availableData.push(null)
                
              }        
            }   
            console.log(this.availableData,"j")

          }),
          (error: any) => {
            console.error('Error fetching user by ID:', error);
          }
        

       
          this.totalAnnouncements = data.length;


      }),
      
      (error: any) => {
        console.error('Error fetching user by ID:', error);
      }
  
  }

  totalAnnouncements!: number;
 
    
  
  
}
