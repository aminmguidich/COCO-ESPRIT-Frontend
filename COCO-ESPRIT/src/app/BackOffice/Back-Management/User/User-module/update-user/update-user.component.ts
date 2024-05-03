import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/BackOffice/Back-Core/Services/User/_services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  hadCar: boolean = false;
  selectedUserFile: File = null; 
  selectedCarFile: File = null; 
  validateForm!: FormGroup;
  errorMessage: string = '';
  updateSuccess: boolean = false;
  userImageUrl: string;
  carImageUrl:string;

  constructor(private userService: UserService, private fb: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      fullname: [null, [Validators.required]],
      niv: [null, [Validators.required]],
      espritId: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      birthDate: [null, [Validators.required]],
      registrationNumber: [null, [Validators.required]],
      model: [null, [Validators.required]],
      smoking: [false],
      airConditioned: [false],
      places: [null, [Validators.required]],
      
    });
    this.getUserById();
  }

  getUserById() {
    this.userService.getUserById().subscribe((res) => {
      console.log(res);
      const formattedBirthDate = this.datePipe.transform(new Date(res.birthDate), 'yyyy-MM-dd');
      this.validateForm.patchValue({
        username: res.username,
        fullname: res.fullname,
        phone: res.phone,
        niv: res.niv,
        espritId: res.espritId,
        birthDate: formattedBirthDate,
        registrationNumber: res.carUser ? res.carUser.registrationNumber : null,
        model: res.carUser ? res.carUser.model : null,
        smoking: res.carUser ? res.carUser.smoking : false,
        airConditioned: res.carUser ? res.carUser.airConditioned : false,
        places: res.carUser ? res.carUser.places : null,

      });
      this.userImageUrl = res.imageUrl;
      this.carImageUrl=res.carUser.image
      
      if(res.carUser!= null){
        this.hadCar=true
      }
    });
  }
  updateHadCar(event: any) {
    this.hadCar = event.target.checked;
    console.log(this.hadCar);
  }

  updateUser() {
    
    const formData = this.validateForm.value;

    // Construct the request body with car information nested
    const requestBody = {
      username: formData.username,
      fullname: formData.fullname,
      niv: formData.niv,
      espritId: formData.espritId,
      phone: formData.phone,
      birthDate: formData.birthDate,
      carUser: {
        registrationNumber: formData.registrationNumber,
        model: formData.model,
        smoking: formData.smoking,
        airConditioned: formData.airConditioned,
        places: formData.places,
      }
    };
    //Update user Image
    this.onUpload();
    //Update userCar Image
    this.onCarImageUpload();

    // Call the updateUser service method with the constructed request body
    this.userService.updateUser(requestBody).subscribe(
      (res) => {
        console.log(res);
        // Reset error message if update is successful
        this.errorMessage = '';
        // Set updateSuccess to true
        this.updateSuccess = true;
        this.userService.filter('updated')
      },
      (error) => {
        console.error(error);
        // Set error message based on the error received from the server
        this.errorMessage = error.error.message || 'An error occurred during the update';
      }
    );
  }
  //uploading user image methods

  onFileSelected(event): void {
    this.selectedUserFile = event.target.files[0];
    
  }

  onUpload(): void {
    if (this.selectedUserFile) {
      this.userService.uploadFile(this.selectedUserFile).subscribe(
        response => {
          this.userImageUrl = response;
        },
        error => {
          console.error('Error uploading file', error);
        }
      );
    }
  }
  //uploading user Car image methods
  onCarFileSelected(event): void {
    this.selectedCarFile = event.target.files[0];
  }
  onCarImageUpload(): void {
    if (this.selectedCarFile) {
      this.userService.uploadCarFile(this.selectedCarFile).subscribe(
        response => {
          this.carImageUrl = response;
        },
        error => {
          console.error('Error uploading Car file', error);
        }
      );
    }
  }


  
}
