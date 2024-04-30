import { Component, ViewChild, ElementRef } from '@angular/core';
import { AnnoucementCollocationService } from 'src/app/BackOffice/Back-Core/Services/Collocation/annoucement-collocation.service';
import { AddAnnoucementComponent } from '../add-annoucement/add-annoucement.component';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-list-annoucement',
  templateUrl: './list-annoucement.component.html',
  styleUrls: ['./list-annoucement.component.css']
})
export class ListAnnoucementComponent {
  annoucementscol: any = [];
  searchText: string = '';
  description: string = '';
  selectedAnnouncement: any;
  budgetPart: number | undefined; // Déclaration de la propriété budgetPart
  score: number | undefined; // Déclaration de la propriété score


  @ViewChild('editAnnouncementModal') editAnnouncementModal!: ElementRef; // Référence au modal


  

  constructor(private Annoucementservice: AnnoucementCollocationService) { }

  ngOnInit() {
    this.retrieveAllAnnouncements();
  }

  retrieveAllAnnouncements() {
    this.Annoucementservice.retrieveAllAnnouncements().subscribe(res => {
      console.log(res);
      this.annoucementscol = res;
    });
  }

  deleteAnnoucementCollocation(idCollocationAnnouncement: any) {
    this.Annoucementservice.deleteAnnoucementCollocation(idCollocationAnnouncement).subscribe(
      (res) => {
        console.log(res);
        // Mettre à jour la liste des annonces après la suppression si nécessaire
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'annonce :', error);
      }
    );
  }

  filterAnnouncements() {
    // Vérifiez si au moins un des critères de recherche est renseigné
    if (this.description.trim() || this.budgetPart !== undefined || this.score !== undefined) {
      // Si plusieurs critères sont renseignés
      if (this.description && (this.budgetPart !== undefined || this.score !== undefined)) {
        this.Annoucementservice.filterAnnouncements(this.description, this.budgetPart, this.score).subscribe(
          (res) => {
            this.annoucementscol = res;
          },
          (error) => {
            console.error('Error while filtering announcements:', error);
          }
        );
      } else {
        // Appel du service avec les critères de recherche actuels
        this.Annoucementservice.filterAnnouncements(this.description, this.budgetPart, this.score).subscribe(
          (res) => {
            this.annoucementscol = res;
          },
          (error) => {
            console.error('Error while filtering announcements:', error);
          }
        );
      }
    } else {
      // Si aucun critère de recherche n'est renseigné, récupérer toutes les annonces
      this.retrieveAllAnnouncements();
    }
    
  }
  
  
  


  openEditModal(idCollocationAnnouncement: any) {
    this.selectedAnnouncement = idCollocationAnnouncement;
    this.editAnnouncementModal.nativeElement.show(); // Ouvrir le modal
  }
}
