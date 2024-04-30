import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { House } from 'src/app/BackOffice/Back-Core/Models/Collocation/house';
import { HouseService } from 'src/app/BackOffice/Back-Core/Services/Collocation/house.service';

@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.css']
})
export class AddHouseComponent implements OnInit {
  message!: File;
  base64Data!: Int8Array;
  retrievedImage!: string;
  photo!: File;
  image!: string;
  validateForm!: FormGroup;
  showAlertSuccess: boolean = false;
  showAlertError: boolean = false;
  imageUrl: string | ArrayBuffer | null = null;
house!:House[];
houses=new House();
  formData: FormData = new FormData()
  constructor(private fb: FormBuilder, private houseService: HouseService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      image: [null, [Validators.required]],
      houseType: [null, [Validators.required]],
      places: [null, [Validators.required]],
      location: [null, [Validators.required]], // Champ manquant ajouté
      description: [null, [Validators.required]], // Champ manquant ajouté
      nbrofBedrooms: [null, [Validators.required]], // Champ manquant ajouté
      price: [null, [Validators.required]] // Champ manquant ajouté
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

  save() {
    if (this.validateForm.valid) {
      const formData = new FormData();

      formData.append('image', this.photo);
      formData.append('house', JSON.stringify(this.houses));

      this.houseService.addHouse(formData)
        .subscribe(() => {
          this.showAlertSuccess = true;
          this.ngOnInit();
          this.image = '';
        });
    } else {

      this.showAlertError = true;
    }
  }

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      this.photo = event.target.files[0];
      this.message = this.photo;
      const reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result as string;
      }
      reader.readAsDataURL(this.photo)

    }
  }
  getImage(house:House) {

    console.log(this.retrievedImage)
    this.base64Data = house.image.data;
    this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;

    return this.retrievedImage;
  }


}
