import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthenticationService } from "./services/authentication.service";

@Injectable()
export class AppGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('token') === null || this.authenticationService.isTokenExpired()) {
            this.router.navigate(['/auth/login']);
            return false;
        }

        return true;
    }
}