import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(
    private http: Http,
    private usuarioService: UsuarioService
  ) { }

  getEstados() {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${environment.urlSpring}/estados`, { headers: hds, withCredentials: true });
  }

  getEstadosPorMercado() {
    console.log(this.usuarioService.getUsuarioLogged().mercado.idMercado)
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${environment.urlSpring}/estados/mercado/${this.usuarioService.getUsuarioLogged().mercado.idMercado}`, { headers: hds, withCredentials: true });
  }
}
