import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-back',
  templateUrl: './sidebar-back.component.html',
  styleUrls: ['./sidebar-back.component.css']
})
export class SidebarBackComponent    {
  constructor() { }
  managementDropdownVisible: boolean = false;
  carpoolingDropdownVisible: boolean = false;

  toggleManagementDropdown(event: MouseEvent) {
    this.managementDropdownVisible = !this.managementDropdownVisible;
    event.stopPropagation(); // Prevent event from propagating to parent elements

  }


  toggleCarpoolingDropdown(event: MouseEvent) {
    this.carpoolingDropdownVisible = !this.carpoolingDropdownVisible;
    event.stopPropagation(); // Prevent event from propagating to parent elements

  }


  

}
