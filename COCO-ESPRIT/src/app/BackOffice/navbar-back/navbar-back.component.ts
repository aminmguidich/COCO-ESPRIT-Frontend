import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-back',
  templateUrl: './navbar-back.component.html',
  styleUrls: ['./navbar-back.component.css']
})
export class NavbarBackComponent {

  constructor() { }

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }


  handleSearch() {
    const searchInput = document.getElementById('m-search') as HTMLInputElement;
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
      console.log('Search term:', searchTerm);
      // Here you can perform additional actions, such as sending the search term to a service or performing a search operation
    } else {
      console.log('Please enter a search term.');
    }
  }
}
(window as any).toggleFullScreen = function() {
  // Implement your full-screen toggle logic here
  // For example:
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};
