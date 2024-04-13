// role-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from '../BackOffice/Back-Core/Services/User/_services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleAuthGuard implements CanActivate {

  constructor(private authService: StorageService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const expectedRoles = next.data['expectedRoles'] as Array<string>;
    const userRoles = this.authService.getUser().roles;
    
    if (!userRoles || !expectedRoles || expectedRoles.length === 0) {
      // Redirect to login page if user roles or expected roles are not provided
      this.router.navigate(['/login']);
      return false;
    }
    
    const intersection = expectedRoles.filter(role => userRoles.includes(role));
    if (intersection.length > 0) {
      // User has one of the expected roles, allow access
      return true;
    } else {
      // Redirect to unauthorized page or handle unauthorized access
      this.router.navigate(['/not-autorized']);
      return false;
    }
  }
}
