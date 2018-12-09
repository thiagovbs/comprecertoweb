import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario';
import { JwtHelper } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  hds = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: HttpClient) { }

  getByLogin(login: string) {
    return this.http.get(`${environment.urlSpring}/usuarios/login/${login}`);
  }

  hasPermissoes(): any {
    const usuario: Usuario = this.jwtHelper.decodeToken(localStorage.getItem('token')).user;
    console.log(usuario);
    return usuario.permissoes.length != 0;
  }

  getUsuarioLogged() {
    if (localStorage.getItem('token') !== null) {
      const usuario: Usuario = this.jwtHelper.decodeToken(localStorage.getItem('token')).user;
      return usuario;
    }
  }
}
