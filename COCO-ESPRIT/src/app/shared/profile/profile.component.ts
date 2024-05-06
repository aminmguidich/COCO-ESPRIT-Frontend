import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/BackOffice/Back-Core/Services/User/_services/user.service';
import { User } from 'src/app/FrontOffice/Front-Core/Models/Carpooling/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  
  username?: string;
  userImage: string;
  @Input() user:User;

  constructor(private userService:UserService){

  }


  ngOnInit(): void {
   // this.getUserById();
   if (this.user==null){
    return
   }
     let data=this.user
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
