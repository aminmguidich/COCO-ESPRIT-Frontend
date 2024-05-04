import { AnnouncementCarpooling } from './../../../../Back-Core/Models/Carpooling/announcement-carpooling';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnnouncementCarpoolingService } from 'src/app/BackOffice/Back-Core/Services/Carpooling/announcement-carpooling.service';

@Component({
  selector: 'app-list-annoucement',
  templateUrl: './list-annoucement.component.html',
  styleUrls: ['./list-annoucement.component.css']
})
export class ListAnnoucementComponent implements OnInit{

  data: AnnouncementCarpooling[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formB: FormBuilder,
    private annCarpoolingService: AnnouncementCarpoolingService,) { 
      this.annCarpoolingService.listen().subscribe((m:any)=>{
        console.log(m);
        this.loadData();
      })
    }

 

  ngOnInit() {
    this.loadData()

  }
  


  deleteAnnCarpooling(id: number) {
    this.annCarpoolingService.deleteAnnCarpooling(id).subscribe(
      (response) => {
        alert(' Announcement deleted Successfully!');

       // this.router.navigate(['admin/carpooling/announcement/addAnn']);
       this.loadData();

      },
    )
  }
  loadData(){
    this.annCarpoolingService.getall().subscribe(
      (data: AnnouncementCarpooling[]) => {
        console.log(data);
        this.data = data;
        this.totalAnnouncements = data.length;

      }),
      (error: any) => {
        console.error('Error fetching user by ID:', error);
      }
    ;

  }

  totalAnnouncements!: number;

  

 

  


}
