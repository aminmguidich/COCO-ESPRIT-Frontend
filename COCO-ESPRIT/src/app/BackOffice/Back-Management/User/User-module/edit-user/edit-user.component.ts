import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/BackOffice/Back-Core/Models/User/User';
import { UserService } from 'src/app/BackOffice/Back-Core/Services/User/_services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {





  @Input() userInput!: User;

  user!: User;
  updateForm!: FormGroup;
  constructor(

    private formB: FormBuilder,
    private userService: UserService,
  ) {}

  ngOnInit() {
    if (this.userInput == null) {
      return;
    }

    let data = this.userInput;



    this.updateForm = this.formB.group({
      username: [data.username],
      fullname: [data.fullname],
      class: [data.niv],
      phone: [data.phone],
    });
    this.updateForm.patchValue(data);


  }

  
  async updateUser() {
    this.userInput.username =
      this.updateForm.value.username;
    this.userInput.fullname =
      this.updateForm.value.fullname;
    this.userInput.niv = this.updateForm.value.class;
    this.userInput.phone = this.updateForm.value.phone;




    this.userService.update(this.userInput).subscribe(
      async (response) => {

        alert('User Updated Successfully!');
        this.userService.filter('Register Click')
      },
      (error) => {
        console.error('Update failed:', error);
      }
    );
  }
}