import { Component } from '@angular/core';
import { AuthService } from 'src/app/BackOffice/Back-Core/Services/User/_services/auth.service';

@Component({
  selector: 'app-home-front',
  templateUrl: './home-front.component.html',
  styleUrls: ['./home-front.component.css']
})
export class HomeFrontComponent {

  userDetails:any
  userId:any

  constructor(private authService:AuthService){}

  getUserDetails(){

    this.userDetails = this.authService.userLoggedDetails;

    this.userId = localStorage.getItem("idUser")

  }

  ngOnInit(): void {
      this.getUserDetails()
  }

}
