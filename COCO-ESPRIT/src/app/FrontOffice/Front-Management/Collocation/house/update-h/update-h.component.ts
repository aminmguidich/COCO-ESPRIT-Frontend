import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AnnouncementCollocation } from 'src/app/BackOffice/Back-Core/Models/Collocation/annoucement-collocation';
import { House } from 'src/app/BackOffice/Back-Core/Models/Collocation/house';
import { HouseService } from 'src/app/BackOffice/Back-Core/Services/Collocation/house.service';

@Component({
  selector: 'app-update-h',
  templateUrl: './update-h.component.html',
  styleUrls: ['./update-h.component.css']
})
export class UpdateHComponent implements OnInit {
  validateForm = this.fb.group({
    houseType: ["", [Validators.required]],
    places: [0, [Validators.required]],
    location: ["", [Validators.required]], // Champ manquant ajouté
    description: ["", [Validators.required]], // Champ manquant ajouté
    nbrofBedrooms: [0, [Validators.required]], // Champ manquant ajouté
    price: [0, [Validators.required]]
  });
  id: any;
  announcement: AnnouncementCollocation | undefined;

  imageUrls: string[] = [];
  photo: File[] = [];
  retrievedImage!: string;
  base64Data!: Int8Array;

  nbrofBedrooms = 0

  constructor(
    private houseService: HouseService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // Récupérer l'ID de l'annonce à mettre à jour depuis les paramètres de l'URL
    this.id = parseInt(localStorage.getItem("houseUp") + "");

    // Initialiser le formulaire

    // Charger les détails de l'annonce à partir du service
    this.loadAnnouncement();
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageUrls.push(e.target.result);
        };

        reader.readAsDataURL(file);
        this.photo.push(file); // Push each file into the array
      }
    }
  }
  getImage(house: House) {

    console.log(this.retrievedImage)
    this.base64Data = house.image.data;
    this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;

    return this.retrievedImage;
  }

  // Méthode pour charger les détails de l'annonce à partir du service
  loadAnnouncement() {
    this.houseService.getHouseById(this.id).subscribe(
      (res: any) => {
        // Mettre à jour l'annonce dans le formulaire
        this.announcement = res;
        this.validateForm.patchValue({
          description: res.description,
          houseType: res.houseType,
          location: res.location,
          nbrofBedrooms: res.nbrofBedromms,
          places: res.places,
          price: res.price
        });
        this.nbrofBedrooms = res.nbrofBedromms
      },
      (error) => {
        console.error('Error while loading announcement:', error);
      }
    );
  }

  // Méthode pour mettre à jour l'annonce
  updateHouse() {
    const formData = new FormData();


    // Append each image to the form data
    this.photo.forEach(file => {
      formData.append('image', file);
    });

    formData.append('house', JSON.stringify(this.validateForm.value));

console.log(this.id)
    this.houseService.updateHouse(this.id,formData).subscribe({
      next: data => {

      },
      error: err => {

      }
    });

  }
}
