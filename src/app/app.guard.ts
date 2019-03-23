import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthenticationService } from "./services/authentication.service";

@Injectable()
export class AppGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('teste')
        if (this.authenticationService.isAccessTokenInvalido()) {
            console.log('Navegação com access token inválido. Obtendo novo token...');

            this.authenticationService.obterNovoAccessToken().subscribe((response) => {
                this.authenticationService.armazenarToken(response['access_token']);

                console.log('Novo access token criado!');

                if (this.authenticationService.isAccessTokenInvalido()) {
                    this.router.navigate(['/auth/login']);
                    return false;
                }

                return true;
            }, error => {
                console.log('Erro ao renovar token.', error);
                this.router.navigate(['/auth/login']);
                return false;
            });
        }

        return true;
    }
}