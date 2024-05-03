import { Component } from '@angular/core';
import { UserService } from 'src/app/BackOffice/Back-Core/Services/User/_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  
  username?: string;
  userImage: string;;

  constructor(private userService:UserService){

  }

  ngOnInit(): void {
    this.getUserById();
  }
  
  getUserById() {
    this.userService.getUserById().subscribe((res) => {
        console.log(res);
        
        // Extract the username and image URL from the response
        const { username, imageUrl } = res;

        // Assign the username and image URL to class properties
        this.username = username;
        this.userImage = imageUrl;
    });
}
}
