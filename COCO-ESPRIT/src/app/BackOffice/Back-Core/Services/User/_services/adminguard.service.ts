
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from './storage.service'; // Import your storage service

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: StorageService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }

    // Redirect based on role
    if (this.authService.getUser().roles.includes('ROLE_USER')) {
      this.router.navigateByUrl('/home');
    } 
    

    return true;
  }
}
