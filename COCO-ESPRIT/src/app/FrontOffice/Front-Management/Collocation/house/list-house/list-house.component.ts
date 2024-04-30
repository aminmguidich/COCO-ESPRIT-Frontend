import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractService } from 'src/app/BackOffice/Back-Core/Services/Collocation/contract.service';
import { HouseService } from 'src/app/BackOffice/Back-Core/Services/Collocation/house.service';
import { UserService } from 'src/app/BackOffice/Back-Core/Services/User/_services/user.service';

@Component({
  selector: 'app-list-house',
  templateUrl: './list-house.component.html',
  styleUrls: ['./list-house.component.css']
})
export class ListHouseComponent {
  showMoreInfo(_t7: any) {
    this.openmodaldetails = true;
    this.description = _t7.description;
    this.location = _t7.location;
    this.nbrofBedromms = _t7.nbrofBedromms;
    this.price = _t7.price;

  }
  closemodaldetails() {
    this.openmodaldetails = false;
  }
  openmodaldetails: boolean = false;
  houses: any = [];
  searchText: string = '';
  selectedHouse: any;
  imageUrl: any;
  description!: any;
  location!: any;
  nbrofBedromms!: any;
  price!:any;
  p: number = 1;
  itemsPerPage: number = 3
  userId: any;
  @ViewChild('addHouseModal') addHouseModal!: ElementRef;

  houseSelected:any

  houseIdSelectedToEdit:any

  openHouseToEdit = false

  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private houseService: HouseService,
    private http: HttpClient, // Injecter le HttpClient pour faire des requêtes HTTP,
    private contratService: ContractService,
    private userService:UserService
  ) { }

  ngOnInit() {
    this.userId = parseInt(localStorage.getItem("idUser") + "");
    this.getAllHouses();
    this.validateForm = this.fb.group({
      description: [null, [Validators.required]],
    });
  }

  selectHouseToEdit(id:any){

    localStorage.setItem("houseUp",id+"")

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
        alert("deleted")
        console.log('Maison supprimée avec succès');
        // Mettre à jour la liste des maisons après la suppression si nécessaire
      },
      (error) => {
        console.error('Erreur lors de la suppression de la maison :', error);
      }
    );
  }

  addHouse() {
    if (this.validateForm.invalid) {
      console.error('Form is invalid. Please fill in all required fields.');
      this.validateForm.markAllAsTouched();
      return;
    }
  }


  openEditModal(id: any) {
    this.selectedHouse = id;
    // Ouvrir le modal ici en utilisant l'ID
  }

  generatePdf(contrat: any) {

    // Définir le type de la réponse comme 'blob' pour obtenir un objet Blob (binaire)
    this.http.post(`http://localhost:9092/api/House/pdf`,contrat,{responseType:'blob'}).subscribe((res: any) => {
      // Créer un objet URL pour le blob
      console.log(res)
      const blobURL = URL.createObjectURL(res);

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

  addContrat() {


    
    this.userService.getById(this.userId).subscribe((res:any)=>{

      const today = new Date()

      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();

      const request = {
  
        description: this.houseSelected.description,
        nombre_de_places: this.houseSelected.nbrofBedrooms,
        houseType: this.houseSelected.houseType,
        location: this.houseSelected.location,
        owner: this.houseSelected.username,
        uname: res.username,
        date:day+"-"+month+"-"+year,
        houseId:this.houseSelected.idHouse,
        userId:res.id
  
      }

      console.log("request ==> : ",request)
      this.contratService.addContract(request).subscribe((r: any) => {

        this.generatePdf(r)
  
      })

    })
    



  }



}

