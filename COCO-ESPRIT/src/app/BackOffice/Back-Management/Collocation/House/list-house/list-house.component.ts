import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HouseService } from 'src/app/BackOffice/Back-Core/Services/Collocation/house.service';

@Component({
  selector: 'app-list-house',
  templateUrl: './list-house.component.html',
  styleUrls: ['./list-house.component.css']
})
export class ListHouseComponent  {
  houses: any = [];
  searchText: string = '';
  selectedHouse: any;
  imageUrls:any;
  p: number = 1;
  itemsPerPage: number = 3;
  photo: File[] = [];
  openHouseToEdit = false
idhousetoUpdate:any;


  @ViewChild('addHouseModal') addHouseModal!: ElementRef; 
nbrofBedrooms: any;

  constructor(
    private fb: FormBuilder,
    private houseService: HouseService,
    private http: HttpClient // Injecter le HttpClient pour faire des requêtes HTTP

  ) { }

  validateFormhouse = this.fb.group({
    houseType: ["", [Validators.required]],
    places: [0, [Validators.required]],
    location: ["", [Validators.required]], // Champ manquant ajouté
    description: ["", [Validators.required]], // Champ manquant ajouté
    nbrofBedrooms: [0, [Validators.required]], // Champ manquant ajouté
    price: [0, [Validators.required]]
  });
  id: any;

  ngOnInit() {
    this.getAllHouses();
    console.log("house component")
  }

  getAllHouses() {
    this.houseService.getAllHouses().subscribe(res => {
      console.log(res);
      this.houses = res;
    });
  }

  deleteHouse(id: number) {
    this.houseService.deleteHouse(id).subscribe(
      () => {
        this.getAllHouses()
        console.log('Maison supprimée avec succès');
        // Mettre à jour la liste des maisons après la suppression si nécessaire
      },
      (error) => {
        console.error('Erreur lors de la suppression de la maison :', error);
      }
    );
  }
  updateHouse() {
    const formData = new FormData();


    // Append each image to the form data
    this.photo.forEach(file => {
      formData.append('image', file);
    });

    formData.append('house', JSON.stringify(this.validateFormhouse.value));

console.log(this.idhousetoUpdate.idHouse)
    this.houseService.updateHouse(this.idhousetoUpdate,formData).subscribe({
      next: data => {

      },
      error: err => {

      }
    });

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

  openEditModal(id: any) {
    this.selectedHouse = id;
    // Ouvrir le modal ici en utilisant l'ID
  }

  generatePdf(houseId:number) {
    const contractId = 1;
   

    const url = `http://localhost:9092/House/pdf?contractId=${contractId}&houseId=${houseId}`;

    // Définir le type de la réponse comme 'blob' pour obtenir un objet Blob (binaire)
    this.http.get(url, { responseType: 'blob' }).subscribe((resBlob: Blob) => {
      // Créer un objet URL pour le blob
      const blobURL = URL.createObjectURL(resBlob);

      // Créer un élément <a> pour le téléchargement ou l'affichage
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style.display = 'none';
      
      // Définir l'URL du lien <a> avec l'URL du blob
      a.href = blobURL;

      // Définir l'attribut 'download' pour le téléchargement avec un nom de fichier
      a.download = 'document.pdf';

      // Simuler un clic sur le lien pour télécharger ou afficher le PDF dans un nouvel onglet
      a.click();

      // Libérer l'URL du blob
      URL.revokeObjectURL(blobURL);

      // Retirer l'élément <a> du DOM
      document.body.removeChild(a);
    }, (error) => {
      console.error('Erreur lors de la génération du PDF :', error);
    });
  }


  
}
