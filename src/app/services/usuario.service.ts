import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  hds = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  constructor(private http: HttpClient) { }

  getByLogin(login: string) {
    return this.http.get(`${environment.urlSpring}/usuarios/login/${login}`);
  }

  hasPermissoes(): any {
    const usuario: Usuario = new JwtHelperService().decodeToken(localStorage.getItem('token')).user;
    console.log(usuario);
    return usuario.permissoes.length != 0;
  }

  getUsuarioLogged() {
    const usuario: Usuario = new JwtHelperService().decodeToken(localStorage.getItem('token')).user;
    return usuario;
  }
}
