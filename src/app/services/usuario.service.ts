import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
}
