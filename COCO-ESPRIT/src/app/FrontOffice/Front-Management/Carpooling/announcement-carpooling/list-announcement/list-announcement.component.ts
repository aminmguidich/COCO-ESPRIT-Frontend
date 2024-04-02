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

@Component({
  selector: 'app-list-announcement',
  templateUrl: './list-announcement.component.html',
  styleUrls: ['./list-announcement.component.css']
})
export class ListAnnouncementComponent implements OnInit  {
AddReact() {
throw new Error('Method not implemented.');
}

Require(id:number) {
  const date = new Date();
  const user:User={
    id: 1,
    name: '',
    lastname: '',
    score: 0,
    adressUser: new Adress
  }
  const reqCarpooling:RequirementCarpooling={
    idCarRequirement: 0,
    description: '',
    dateCarpoolingRequirement: date,
    budgetPart: 0,
    announcementCarpoolingReq: {
      idCarpoolingAnnouncement: id,
      dateCarpoolingAnnouncement: new Date,
      description: '',
      score: 0,
      userAnnCarpooling: new User,
      routeAnnCarpooling: new Route
    }
  }
this.reqCarpoolingService.addReqCarpooling(reqCarpooling).subscribe((next)=>{
  console.log(next)
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
    private annCarpoolingService: AnnouncementCarpoolingService,private reqCarpoolingService:RequirementCarpoolingService) { }
 
  ngOnInit() {

    this.annCarpoolingService.getall().subscribe(
      (data: AnnouncementCarpooling[]) => {
        this.data = data;
        if(this.data.length>this.paginatorData.pageSize){
          this.availableData=this.data.slice(0,this.paginatorData.pageSize)
        }else{
          this.availableData=this.data.slice(0,this.data.length)
          let k=this.paginatorData.pageSize-this.availableData.length
          for(let i=0;i<k;i++){
            this.availableData.push(null)
          }        }
        

      }),
      (error: any) => {
        console.error('Error fetching user by ID:', error);
      }
    this.annCarpoolingService.getall().subscribe((data) => {
      this.totalAnnouncements = data.length;
    });
  }

  totalAnnouncements!: number;
 
    
  
  
}
