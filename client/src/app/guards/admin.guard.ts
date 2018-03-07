import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AdminGuard implements CanActivate {

  constructor( private authService: AuthService, private router: Router) { }

  redirectUrl; // URL the user is redirected to.

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.authService.loggedIn() && this.authService.isAdmin()) {
      return true;
    } else {
      this.redirectUrl = state.url; // When user comes to hte route initially we save it.
      this.router.navigate(['/home']);
      return false;
    }
  }
}




