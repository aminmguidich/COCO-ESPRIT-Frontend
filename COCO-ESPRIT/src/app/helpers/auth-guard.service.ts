import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../BackOffice/Back-Core/Services/User/_services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private storageService: StorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.storageService.getUser();
    console.log(this.storageService.getUser);
    if (currentUser) {
      // Check if the route is restricted by role
      if (route.data && route.data['roles'] && !route.data['roles'].includes(currentUser.role)) {
        // Role not authorized, redirect to not-authorized page
        this.router.navigate(['/register']);
        return false;
      }
      
      // User has the required role, allow access to the route
      return true;
    }

    // Not logged in, so redirect to login page with the return URL
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
