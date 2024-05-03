import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/BackOffice/Back-Core/Services/User/_services/auth.service';
import { StorageService } from 'src/app/BackOffice/Back-Core/Services/User/_services/storage.service';
import { UserService } from 'src/app/BackOffice/Back-Core/Services/User/_services/user.service';

@Component({
  selector: 'app-header-front',
  templateUrl: './header-front.component.html',
  styleUrls: ['./header-front.component.css']
})
export class HeaderFrontComponent {
  dropdownOpen: boolean = false;
  username?: string;
  userImage: string = 'https://bootdey.com/img/Content/avatar/avatar1.png';
  showImage: boolean = false;
  isLoggedIn = false;
  constructor(
    private userService: UserService,
    private storageService:StorageService,
    private authService: AuthService,
    private router: Router,

    // Inject Router
  ) { this.userService.listen().subscribe((m:any)=>{
    this.ngOnInit()
  })
       
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

  
  toggleDropdown(event: Event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    this.dropdownOpen = !this.dropdownOpen;
    // Toggle the visibility of the image when the dropdown is clicked
    this.showImage = !this.showImage;
}
 // Method to handle user sign-out
 logout(): void {
  const confirmed = window.confirm("Are you sure you want to log out?");

  if (!confirmed) {
    return; // Don't log out if user cancels
  }

  this.storageService.clearUser(); 

  this.authService.logout().subscribe(
    response => {
      console.log(response); 
      this.router.navigate(['/login']); 
    },
    error => {
      console.log(error); 
    }
  );
}


}
