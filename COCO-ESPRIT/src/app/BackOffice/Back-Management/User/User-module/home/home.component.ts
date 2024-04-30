import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/BackOffice/Back-Core/Services/User/_services/auth.service';
import { StorageService } from 'src/app/BackOffice/Back-Core/Services/User/_services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userDetails:any

  constructor(private authService:AuthService){}

  getUserDetails(){

    this.userDetails = this.authService.userLoggedDetails();

    console.log(this.userDetails)

  }

  ngOnInit(): void {
      this.getUserDetails()
  }

}
