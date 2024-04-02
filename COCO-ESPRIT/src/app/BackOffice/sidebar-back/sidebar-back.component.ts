import { Component } from '@angular/core';
import { AuthService } from '../Back-Core/Services/User/_services/auth.service';
import { StorageService } from '../Back-Core/Services/User/_services/storage.service';

@Component({
  selector: 'app-sidebar-back',
  templateUrl: './sidebar-back.component.html',
  styleUrls: ['./sidebar-back.component.css']
})
export class SidebarBackComponent    {
  constructor(private storageService: StorageService, private authService: AuthService) { }
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
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
