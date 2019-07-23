import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario';
import { JwtHelper } from 'angular2-jwt';
import { UsuarioSenhas } from '../models/usuarioSenhas';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  hds = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: HttpClient,
    private http2: Http,) { }

  getByLogin(login: string) {
    return this.http.get(`${environment.urlSpring}/usuarios/login/${login}`);
  }

  hasPermissoes(): any {
    const usuario: Usuario = this.jwtHelper.decodeToken(localStorage.getItem('token')).user;
    return usuario.permissoes.length != 0;
  }

  getUsuarioLogged() {
    if (localStorage.getItem('token') !== null) {
      const usuario: Usuario = this.jwtHelper.decodeToken(localStorage.getItem('token')).user;
      return usuario;
    }
  }

  putUsuarioSenhas(newPassword :string, oldPassword: string) {
    const usuarioSenhas= new UsuarioSenhas();
    usuarioSenhas.newPassword=newPassword;
    usuarioSenhas.oldPassword=oldPassword;
    const usuario: Usuario = this.jwtHelper.decodeToken(localStorage.getItem('token')).user;

    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http2.put(`${environment.urlSpring}/usuarios/${usuario.idUsuario}`, usuarioSenhas,{ headers: hds, withCredentials: true })
  }
  

  
}
