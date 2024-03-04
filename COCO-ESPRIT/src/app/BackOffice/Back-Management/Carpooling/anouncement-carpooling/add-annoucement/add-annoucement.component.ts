import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnouncementCarpooling } from 'src/app/BackOffice/Back-Core/Models/Carpooling/announcement-carpooling';
import { AnnouncementCarpoolingService } from 'src/app/BackOffice/Back-Core/Services/Carpooling/announcement-carpooling.service';

@Component({
  selector: 'app-add-annoucement',
  templateUrl: './add-annoucement.component.html',
  styleUrls: ['./add-annoucement.component.css']
})
export class AddAnnoucementComponent implements OnInit {
  constructor(private annCarpoolingService:AnnouncementCarpoolingService , private router: Router) { }
  
  ngOnInit() {
  }
  add(form: NgForm) {
    if (form.valid) {
      // Convert the string to a Date object
      const date = new Date(form.value.date);
  
      const annCarpooling: AnnouncementCarpooling = {
        idCarpoolingAnnouncement: 0,
        description: form.value.description,
        score: Number(form.value.score),
        dateCarpoolingAnnouncement: date
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
