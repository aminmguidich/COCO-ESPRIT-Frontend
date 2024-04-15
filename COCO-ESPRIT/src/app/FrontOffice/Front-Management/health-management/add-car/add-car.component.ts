import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Car } from 'src/app/BackOffice/Back-Core/Models/Health/Car';
import { PhotosService } from 'src/app/BackOffice/Back-Core/Services/ForumS/photos.service';
import { CarService } from 'src/app/BackOffice/Back-Core/Services/HealthService/car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent {
  myForm!: FormGroup;
  car: Car = new Car(); 
  imgUrl: string | ArrayBuffer = 'assets/upload.png';
  file: File | null = null;


  constructor(
    private fb: FormBuilder,
    private s: CarService,
    private photoService :PhotosService,
    private router: Router,
    private _dialogRef: MatDialogRef<AddCarComponent>
    ) { 
    
  }

  placesValidator(control: FormControl): ValidationErrors | null {
    const places = control.value;
    if (places > 4) {
      return { 'exceedsPlaces': true };
    }
    return null;
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      registrationNumber: ['', [Validators.required]],
      smoking: [''],
      airConditioned: [''],
      places: ['', [Validators.required, this.placesValidator]], // Ajoutez la validation personnalisée ici
      model: ['', [Validators.required]]
    });
  }
  
  get registrationNumber(){
    return this.myForm.get('registrationNumber')
  }
  get image(){
    return this.myForm.get('image')
  }
  get smoking(){
    return this.myForm.get('smoking')
  }
  get airConditioned(){
    return this.myForm.get('airConditioned')
  }
  get places(){
    return this.myForm.get('places')
  }
  get model(){
    return this.myForm.get('model')
  }

onSubmit() {
  let c = new Car();
  c.registrationNumber=this.registrationNumber.value;
c.image = this.file;
c.smoking=this.smoking.value;
c.airConditioned=this.airConditioned.value;
c.places=this.places.value;
c.model=this.model.value;

const title = this.myForm.get('model')?.value;
if (this.file) {
  this.savePhoto(this.file, c);
} else {
  this.addCar(c);
}

}
addCar(car: Car): void {
  console.log(car);
  this.s.addCar(car).subscribe(() => {
        this.myForm.reset(); 
        this._dialogRef.close(true);
      
    
  });
}  


gotoList() {
this.router.navigate(['/ListCarsFront']);
}

/*onFileInput(files: FileList | null): void {
  if (files) {
    this.file = files.item(0);
    if (this.file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.file);
      fileReader.onload = (event) => {
        if (fileReader.result) {
          this.imgUrl = fileReader.result;
        }
      };
    }
  }
}*/
onFileInput(files: FileList | null): void {
  if (files) {
    this.file = files.item(0);
  //  console.log('Selected file:', this.file);
    
    if (this.file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.file);
      fileReader.onload = () => {
        this.imgUrl = fileReader.result;
      //  console.log('Image URL:', this.imgUrl);
      };
    }
  }
}

savePhoto(file: File, car: Car): void {
  const title = this.myForm.get('model')?.value;
  if (title) {
    this.photoService.uploadImage(file, title)
      .subscribe({
        next: (res: string) => { 
          car.image = res;
          this.addCar(car);
          console.log('Image uploaded successfully:', res);
        },
        error: (error: any) => {
          console.error('Error uploading image:', error);
        }
      });
  }
}
}
