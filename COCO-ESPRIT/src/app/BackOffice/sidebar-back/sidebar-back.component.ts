import { Component } from '@angular/core';
import { AuthService } from '../Back-Core/Services/User/_services/auth.service';
import { StorageService } from '../Back-Core/Services/User/_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-back',
  templateUrl: './sidebar-back.component.html',
  styleUrls: ['./sidebar-back.component.css']
})
export class SidebarBackComponent    {
  constructor(private storageService: StorageService, private authService: AuthService,  private router: Router) { }
  managementDropdownVisible: boolean = false;
  carpoolingDropdownVisible: boolean = false;
  userDropdownVisible: boolean = false;


  toggleManagementDropdown(event: MouseEvent) {
    this.managementDropdownVisible = !this.managementDropdownVisible;
    event.stopPropagation(); // Prevent event from propagating to parent elements

  }


  toggleCarpoolingDropdown(event: MouseEvent) {
    this.carpoolingDropdownVisible = !this.carpoolingDropdownVisible;
    event.stopPropagation(); // Prevent event from propagating to parent elements

  }

  toggleUserDropdown(event: MouseEvent) {
    this.userDropdownVisible = !this.userDropdownVisible;
    event.stopPropagation(); // Prevent event from propagating to parent elements
  }
  logout(): void {
    this.storageService.clearUser(); // Clear user data from storage
  
    this.authService.logout().subscribe(
      response => {
        console.log(response); // Handle response from the backend
        this.router.navigate(['/login']); // Navigate to login page or any other desired page
      },
      error => {
        console.log(error); // Handle error if any
      }
    );
  }

}
