import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnouncementCollocation } from 'src/app/BackOffice/Back-Core/Models/Collocation/annoucement-collocation';
import { AnnoucementCollocationService } from 'src/app/BackOffice/Back-Core/Services/Collocation/annoucement-collocation.service';

@Component({
  selector: 'app-add-annoucement',
  templateUrl: './add-annoucement.component.html',
  styleUrls: ['./add-annoucement.component.css']
})
export class AddAnnoucementComponent implements OnInit {


  validateForm!: FormGroup;
  showAlertSuccess: boolean = false; // Variable pour contrôler l'affichage de l'alerte de succès

  constructor(private fb: FormBuilder, private annoucementService: AnnoucementCollocationService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      description: [null, [Validators.required]],
      budgetPart: [null, [Validators.required]],
      score: [null, [Validators.required]],
      dateCollocationAnnouncement: [null, [Validators.required]],

    });
  }

  get description() {
    return this.validateForm.get('description');
  }

  get budgetPart() {
    return this.validateForm.get('budgetPart');
  }

  get score() {
    return this.validateForm.get('score');
  }

  get dateCollocationAnnouncement() {
    return this.validateForm.get('dateCollocationAnnouncement');
  }


  postAnnoucementCollocation() {
    if (this.validateForm.invalid) {
      console.error('Form is invalid. Please fill in all required fields.');
      this.validateForm.markAllAsTouched();
      return;
    }

    const newAnnouncement: AnnouncementCollocation = {
      ...this.validateForm.value,
      dateCollocationAnnouncement: new Date(this.validateForm.value.dateCollocationAnnouncement)
    };

    this.annoucementService.postAnnoucementCollocation(newAnnouncement).subscribe(
      (response) => {
        console.log('Announcement created successfully:', response);
        this.showAlertSuccess = true;
        setTimeout(() => {
          this.showAlertSuccess = false;
        }, 3000);
        this.validateForm.reset();
      },
      (error) => {
        console.error('Error while creating announcement:', error);
      }
    );
  }

}
