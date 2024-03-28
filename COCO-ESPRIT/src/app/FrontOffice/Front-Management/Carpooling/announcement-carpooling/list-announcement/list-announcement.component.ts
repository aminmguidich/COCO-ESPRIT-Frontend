import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnouncementCarpooling } from 'src/app/FrontOffice/Front-Core/Models/Carpooling/announcement-carpooling';
import { PaginatorData } from 'src/app/FrontOffice/Front-Core/Models/Carpooling/paginator-data';
import { AnnouncementCarpoolingService } from 'src/app/FrontOffice/Front-Core/Services/Carpooling/announcement-carpooling.service';

@Component({
  selector: 'app-list-announcement',
  templateUrl: './list-announcement.component.html',
  styleUrls: ['./list-announcement.component.css']
})
export class ListAnnouncementComponent implements OnInit  {
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
    private annCarpoolingService: AnnouncementCarpoolingService,) { }
 
  ngOnInit() {

    this.annCarpoolingService.getall().subscribe(
      (data: AnnouncementCarpooling[]) => {
        console.log(data);
        this.data = data;
        if(this.data.length>this.paginatorData.pageSize){
          this.availableData=this.data.slice(0,this.paginatorData.pageSize)
        }else{
          this.availableData=this.data
        }
        

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
