import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { MercadoLocalidadeService } from './mercado-localidade.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  oauthTokenUrl = `${environment.urlAuth}/oauth/token`;
  jwtPayload: any;
  tokensRenokeUrl = `${environment.urlAuth}/tokens/revoke`;
  jwtHelper: JwtHelper = new JwtHelper();
  idLoggedIn:any


  constructor(private http: HttpClient, 
              private router: Router, 
              private mercadoLocalidadeService: MercadoLocalidadeService) { }

  login(usuario: String, senha: String) {
    const hds = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA=='
    });
    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    return this.http.post(this.oauthTokenUrl, body, { headers: hds, withCredentials: true });
  }

  getUsuarioLoggedToken(){
    const token = localStorage.getItem('token');
    return this.jwtHelper.decodeToken(token)
  }

  armazenarToken(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    this.limparAccessToken();
    this.router.navigate(['/auth/login']);
  }

  limparAccessToken() {
    this.mercadoLocalidadeService.setLocalAlcance(null)
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  isTokenExpired() {
    if (localStorage.getItem('token') !== null)
      return this.jwtHelper.isTokenExpired(localStorage.getItem('token'));
  }

  obterNovoAccessToken() {
    const hds = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA=='
    });

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body,
      { headers: hds, withCredentials: true });
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    const jwtHelper: JwtHelper = new JwtHelper();

    return !token || jwtHelper.isTokenExpired(token);
  }
}
