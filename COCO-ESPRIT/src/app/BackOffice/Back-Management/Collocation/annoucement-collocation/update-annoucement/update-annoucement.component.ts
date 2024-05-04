import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AnnouncementCollocation } from 'src/app/BackOffice/Back-Core/Models/Collocation/annoucement-collocation';
import { AnnoucementCollocationService } from 'src/app/BackOffice/Back-Core/Services/Collocation/annoucement-collocation.service';

@Component({
  selector: 'app-update-annoucement',
  templateUrl: './update-annoucement.component.html',
  styleUrls: ['./update-annoucement.component.css']
})
export class UpdateAnnoucementComponent implements OnInit {
  validateForm!: FormGroup;
  id: any;
  announcement: AnnouncementCollocation | undefined;

  constructor(
    private Annoucementservice: AnnoucementCollocationService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // Récupérer l'ID de l'annonce à mettre à jour depuis les paramètres de l'URL
    this.id = this.activatedRoute.snapshot.params['id'];

    // Initialiser le formulaire
    this.validateForm = this.fb.group({
      description: [null, [Validators.required]],
      budgetPart: [null, [Validators.required]],
      score: [null, [Validators.required]],
      dateCollocationAnnouncement: [new Date(), [Validators.required]]
    });

    // Charger les détails de l'annonce à partir du service
    this.loadAnnouncement();
  }

  // Méthode pour charger les détails de l'annonce à partir du service
  loadAnnouncement() {
    this.Annoucementservice.getAnnouncementCollocationById(this.id).subscribe(
      (announcement: AnnouncementCollocation) => {
        // Mettre à jour l'annonce dans le formulaire
        this.announcement = announcement;
        this.validateForm.patchValue({
          description: announcement.description,
          budgetPart: announcement.budgetPart,
          score: announcement.score,
          dateCollocationAnnouncement: new Date(announcement.dateCollocationAnnouncement)
        });
      },
      (error) => {
        console.error('Error while loading announcement:', error);
      }
    );
  }

  // Méthode pour mettre à jour l'annonce
  updateAnnoucementCollocation() {
    if (this.id && this.validateForm.valid) {
      // Appeler le service pour mettre à jour l'annonce
      this.Annoucementservice.updateAnnoucementCollocation(this.id, this.validateForm.value).subscribe(
        (res) => {
          console.log('Announcement updated successfully:', res);
          // Redirection ou autre action à effectuer après la mise à jour réussie
        },
        (error) => {
          console.error('Error while updating announcement:', error);
        }
      );
    } else {
      console.error('Invalid form data or ID is undefined.');
    }
  }
}
