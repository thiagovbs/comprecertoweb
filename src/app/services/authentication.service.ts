import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  oauthTokenUrl = `${environment.urlSpring}/oauth/token`;
  jwtPayload: any;
  tokensRenokeUrl = `${environment.urlSpring}/tokens/revoke`;

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: HttpClient, private router: Router, private usuarioService: UsuarioService) { }

  login(usuario: String, senha: String): void {
    const hds = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA=='
    });

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    this.http.post(this.oauthTokenUrl, body, { headers: hds, withCredentials: true }).subscribe(
      data => {
        console.log(data)
        this.armazenarToken(data['access_token']);

        if (!this.usuarioService.hasPermissoes()) {
          console.log('O usuário não possui nenhum permissão');
          return;
        }

        this.router.navigate(['/secure/analytics']);
      }, error => {
        if (error.status === 400) {
          const responseJson = error.json();

          if (responseJson.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private armazenarToken(token: string) {
    localStorage.setItem('token', token);
  }


  logout() {
    this.limparAccessToken();
    this.router.navigate(['/auth/login']);
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  isTokenExpired() {
    if (localStorage.getItem('token') !== null)
      return this.jwtHelper.isTokenExpired(localStorage.getItem('token'));
  }
}
