import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { House } from 'src/app/BackOffice/Back-Core/Models/Collocation/house';
import { HouseService } from 'src/app/BackOffice/Back-Core/Services/Collocation/house.service';
import { ReactcollService } from 'src/app/BackOffice/Back-Core/Services/Collocation/reactcoll.service';
import { UserService } from 'src/app/BackOffice/Back-Core/Services/User/_services/user.service';

@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.css']
})
export class AddHouseComponent implements OnInit {
  message!: File;
  base64Data!: Int8Array;
  retrievedImage!: string;
  photo: File[] = [];
  image!: string;
  validateForm!: FormGroup;
  showAlertSuccess: boolean = false;
  showAlertError: boolean = false;
  imageUrl: string | ArrayBuffer | null = null;
  house!: House[];
  houses = new House();
  formData: FormData = new FormData()
  imageUrls: string[] = [];
  test: string = "test";
  userId: any;
  constructor(private http:HttpClient, private reactService:ReactcollService,private fb: FormBuilder, private houseService: HouseService, router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userId = parseInt(localStorage.getItem("idUser") + "");
    this.validateForm = this.fb.group({
      houseType: [null, [Validators.required]],
      places: [null, [Validators.required,Validators.maxLength(1)]],
      location: [null, [Validators.required]], // Champ manquant ajouté
      description: [null, [Validators.required]], // Champ manquant ajouté
      nbrofBedrooms: [null, [Validators.required,Validators.maxLength(1)]], // Champ manquant ajouté
      price: [null, [Validators.required,Validators.maxLength(3)]],
      budgetPart: [null, [Validators.required,Validators.maxLength(3)]],
      title: [null, [Validators.required]]
    });
  }



  get houseType() {
    return this.validateForm.get('houseType');
  }

  get places() {
    return this.validateForm.get('places');
  }

  get location() {
    return this.validateForm.get('location');
  }

  get description() {
    return this.validateForm.get('description');
  }

  get nbrofBedrooms() {
    return this.validateForm.get('nbrofBedrooms');
  }
  get price() {
    return this.validateForm.get('price');
  }

  get budgetPart() {
    return this.validateForm.get('budgetPart');
  }



  handleSaveAnnouncement(): void {
    if (this.validateForm.valid && this.photo.length > 0) {

      this.userService.getById(this.userId).subscribe((r: any) => {

        const formData = new FormData();


        // Append each image to the form data
        this.photo.forEach(file => {
          formData.append('image', file);
        });

        console.log(r)

        formData.append('house', JSON.stringify(this.validateForm.value));
        formData.append('userId', r.id);
        formData.append('username', r.username);

        this.houseService.addHouse(formData).subscribe({
          next: (data:any) => {
            this.validateForm.reset()
            this.photo = []
            

            this.http.get("http://localhost:9092/api/user/all").subscribe((r:any)=>{

              for (let i = 0; i < r.length; i++) {
                
                this.reactService.postReactCol({
                  idUser:r[i].id,
                  idAnn:data.idCollocationAnnouncement,
                  likes:false,
                  dislikes:false
                }).subscribe((res:any)=>{

                  console.log("all users are added",res)

                })
                
              }

            })
            
          },
          error: err => {

          }
        });

      })


    } else {

    }
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

  /*addHouse() {
    if (this.validateForm.invalid) {
      console.error('Form is invalid. Please fill in all required fields.');
      this.validateForm.markAllAsTouched();
      return;
    }

    const newHouse: House = {
      ...this.validateForm.value
    };

    this.houseService.addHouse(newHouse).subscribe(
      (response) => {
        console.log('House added successfully:', response);
        this.showAlertSuccess = true;
        setTimeout(() => {
          this.showAlertSuccess = false;
        }, 3000);
        this.validateForm.reset();
      },
      (error) => {
        console.error('Error while adding house:', error);
      }
    );
  }*/
}
