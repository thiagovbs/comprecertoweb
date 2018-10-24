import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  oauthTokenUrl = `${environment.urlSpring}/oauth/token`;
  jwtPayload: any;
  tokensRenokeUrl = `${environment.urlSpring}/tokens/revoke`;

  constructor(private http: HttpClient, private router: Router) { }

  login(usuario: String, senha: String): void {
    const hds = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA=='
    });

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    this.http.post(this.oauthTokenUrl, body, { headers: hds, withCredentials: true }).subscribe(
      data => {
        this.armazenarToken(data['access_token']);
        this.router.navigate(['/starter']);
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

  private getToken() {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

  logout() {
    this.limparAccessToken();
    this.router.navigate(['/auth/login']);
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }
}
