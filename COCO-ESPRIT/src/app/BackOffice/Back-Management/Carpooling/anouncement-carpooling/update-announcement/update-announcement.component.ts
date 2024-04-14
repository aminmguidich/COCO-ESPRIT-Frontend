import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnouncementCarpooling } from 'src/app/BackOffice/Back-Core/Models/Carpooling/announcement-carpooling';
import { AnnouncementCarpoolingService } from 'src/app/BackOffice/Back-Core/Services/Carpooling/announcement-carpooling.service';

@Component({
  selector: 'app-update-announcement',
  templateUrl: './update-announcement.component.html',
  styleUrls: ['./update-announcement.component.css']
})
export class UpdateAnnouncementComponent implements OnInit{
  @Input()Id!:number;
  id!: number;
  annCarpooling!: AnnouncementCarpooling;
  updateForm!: FormGroup;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private formB: FormBuilder,
    private annCarpoolingService: AnnouncementCarpoolingService,

  ) { }

  ngOnInit() {
    if(this.Id==null){
      return 
    }
      this.annCarpoolingService.getAnnCarpoolingById(this.Id).subscribe(
        (data: AnnouncementCarpooling) => {
          console.log(data);
          this.annCarpooling = data;
          this.updateForm = this.formB.group({
            dateAnnCarpooling: [data.dateCarpoolingAnnouncement],
            descriptionAnnCarpooling: [data.description],
            scoreAnnCarpooling: [data.score]


          });
          this.updateForm.patchValue(data);
        }

      )
        ,
        (error: any) => {
          console.error('Error fetching user by ID:', error);
        }
    }
  

  updateAnnouncementCarpooling() {
    this.annCarpooling.idCarpoolingAnnouncement = this.Id;
    this.annCarpooling.dateCarpoolingAnnouncement = this.updateForm.value.dateAnnCarpooling;
    this.annCarpooling.description = this.updateForm.value.descriptionAnnCarpooling;
    this.annCarpooling.score = this.updateForm.value.scoreAnnCarpooling;

    this.annCarpoolingService.updateAnnCarpooling(this.annCarpooling).subscribe(
      (response) => {
        alert('Announcement Updated Successfully!');
        //console.log(this.user)
        this.router.navigate(['admin/carpooling/announcement/']);

      },
      (error) => {
        console.error('Update failed:', error);
      }
    );
  }


}
